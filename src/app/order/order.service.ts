import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Like,LessThan,MoreThan } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findAll(customerName?: string,status?: string , sort?: Object) : Promise<Order[]> {
    let option: Object = {
      relations: ['product'],
      where: {}
    };

    if (status) option['where']['status'] = status;

    if (customerName) option['where']['customer_name'] = Like('%'+customerName+'%');

    if (sort) {
      option['order'] = {};
      option['order'][sort['name']] = sort['value'];
    }

    return this.orderRepository.find(option).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne(id,{ relations: ['product']}).catch(err => {
      throw new HttpException({
        message: err.message  
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async insert(orderData: Object): Promise<Object> {
    return await this.orderRepository.insert(orderData).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: number, orderData: Object): Promise<void> {
    await this.orderRepository.update(id,orderData).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

}
