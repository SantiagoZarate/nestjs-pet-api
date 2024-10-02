import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatCreateDTO } from './dtos/catCreateDTO';
import { CatSelect } from './interfaces/cat.type';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async getAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  async getOne(id: CatSelect): Promise<Cat> {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return cat;
  }

  async deleteOne(id: CatSelect): Promise<DeleteResult> {
    console.log('DELETING CAT');

    return await this.catRepository.delete({ id });
  }

  async create(newCat: CatCreateDTO): Promise<Cat['id']> {
    const result = await this.catRepository
      .createQueryBuilder()
      .insert()
      .into(Cat)
      .values(newCat)
      .returning('id')
      .execute();

    return result.raw.id;
  }
}
