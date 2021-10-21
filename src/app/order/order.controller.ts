import { Controller, Get, Post, Delete, Req, Query, Param, Body, HttpException, HttpStatus, forwardRef, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderValidation } from './validation/order.validation';
import { ResponseService } from '../../response/response.service';
import { Response, ResponseStatusCode } from '../../response/response.decorator';
import { IResponse } from '../../response/response.interface';
import { Order } from './order.entity';
import { Request } from 'express';
import { AdminJwtAuthGuard } from 'src/auth/admin-jwt-auth.guard';
import { ProductService } from '../product/product.service';
import { isEmpty } from 'class-validator';
import { OrderVerifyValidation } from './validation/order-verify.validation';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import moment from 'moment';
import { fileURLToPath } from 'url';

@Controller('/order')
export class OrderController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService
  ) {}

  @ResponseStatusCode()
  @UseGuards(AdminJwtAuthGuard)
  @Get('/all')
  async all(@Query() query): Promise<IResponse> {
    let sort = query.sort;
    
    if (Array.isArray(sort) && sort.length > 1) sort = sort[0];

    if (sort) {
      sort = sort.split('|');
      sort = {
        name : sort[0],
        value : (sort[1] ?? '').toUpperCase(),
      }
    }

    const orders = await this.orderService.findAll(query.customer_name,query.status,sort);

    let results = [];
    orders.forEach((order,index) => {
      results.push({
        id: order.id,
        customer_name: order.customer_name,
        status: order.status,
        created_at: order.created_at.toLocaleString(),
        product: {
          name : order.product.name,
          price: order.product.price
        },
      });
    });

    return this.responseService.success('OK',results);
  }

  @ResponseStatusCode()
  @UseGuards(AdminJwtAuthGuard)
  @Get('/detail/:id')
  async detail(@Param('id') id: number): Promise<IResponse> {
    const order = await this.orderService.findOne(id);
    return this.responseService.success('OK',order);
  }

  @ResponseStatusCode()
  @Post('/new')
  async new(@Body() orderData: OrderValidation): Promise<IResponse> {
    const product = await this.productService.findOne(orderData.product_id);

    if (isEmpty(product) || !product.active) return this.responseService.error('Product is unavailable');

    if (product.stock <= 0) return this.responseService.error('Product is out of stock');

    orderData['status'] = 'waiting';
    const result = await this.orderService.insert(orderData);

    product.stock -= 1;
    product.sold += 1;
    await this.productService.update(orderData.product_id,product);
    
    return this.responseService.success('OK',{ order: { id: result['raw']['insertId']} });
  }

  @ResponseStatusCode()
  @UseInterceptors(FileInterceptor('proof',{
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = 'P'+Math.round(Math.random() * 1E9)
        const original = file.originalname.split('.')
        callback(null,uniqueSuffix+'.'+original.slice(-1)[0])
      }
    })
  }))
  @Post('/submit/payment/proof')
  async submitPaymentProof(@UploadedFile() proof: Express.Multer.File,@Body() orderData, @Req() request: Request): Promise<IResponse> {
    if (!orderData.id) throw new HttpException({ message: ['id should not be empty'] }, HttpStatus.BAD_REQUEST);
    if (!proof) throw new HttpException({ message: ['proof file should not be empty'] }, HttpStatus.BAD_REQUEST);

    const baseUrl = request.headers.host;
    await this.orderService.update(orderData.id,{ payment_proof : baseUrl+'/public/uploads/'+proof.filename });
    
    return this.responseService.success('OK');
  }

  @ResponseStatusCode()
  @UseGuards(AdminJwtAuthGuard)
  @Post('/verify')
  async updateStatus(@Body() orderData: OrderVerifyValidation): Promise<IResponse> {
    const status = (orderData.validity == 'valid') ? 'approved' : 'cancel';

    await this.orderService.update(orderData.id,{ status: status });
    return this.responseService.success('OK');
  }

  @ResponseStatusCode()
  @UseGuards(AdminJwtAuthGuard)
  @Post('/mark/shipping')
  async markShipping(@Body() orderData): Promise<IResponse> {
    if (!orderData.id) throw new HttpException({ message: ['id should not be empty'] }, HttpStatus.BAD_REQUEST);

    await this.orderService.update(orderData.id,{ status: 'shipped' });
    return this.responseService.success('OK');
  }
}
