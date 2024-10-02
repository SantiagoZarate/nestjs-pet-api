import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatCreateDTO } from './dtos/catCreateDTO';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async getAll(): Promise<Cat[]> {
    return await this.catRepository.find();
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
