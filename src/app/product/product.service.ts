import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Like,LessThan,MoreThan } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(name?: string, sort?: Object) : Promise<Product[]> {
    let option: Object = {
      select : ['id','price','name','description','stock','sold'],
      where : {
        active : true,
        stock : MoreThan(0),
      }
    };

    if (name) option['where']['name'] = Like('%'+name+'%');

    if (sort) {
      option['order'] = {};
      option['order'][sort['name']] = sort['value'];
    }

    return this.productsRepository.find(option).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  async insert(createUserData: Object): Promise<void> {
    await this.productsRepository.insert(createUserData).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: number, createUserData: Object): Promise<void> {
    await this.productsRepository.update(id,createUserData).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
