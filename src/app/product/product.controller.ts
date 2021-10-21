import { Controller, Get, Post, Delete, Req, Query, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductValidation } from './validation/product.validation';
import { ResponseService } from '../../response/response.service';
import { Response, ResponseStatusCode } from '../../response/response.decorator';
import { IResponse } from '../../response/response.interface';
import { Product } from './product.entity';
import { Request } from 'express';

@Controller('/product')
export class ProductController {
  constructor(
    @Response() private readonly responseService: ResponseService,
    private readonly productService: ProductService,
  ) {}

  @ResponseStatusCode()
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

    const products = await this.productService.findAll(query.name,sort);

    return this.responseService.success('OK',products);
  }

  @ResponseStatusCode()
  @Post('/store')
  async store(@Body() productData: ProductValidation): Promise<IResponse> {
    await this.productService.insert(productData);
    return this.responseService.success('OK');
  }

  @ResponseStatusCode()
  @Post('/update/:id')
  async update(@Param('id') id: number,@Body() productData : ProductValidation): Promise<IResponse> {
    await this.productService.update(id,productData);
    return this.responseService.success('OK');
  }

  @ResponseStatusCode()
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    return this.responseService.success('OK');
  }
}
