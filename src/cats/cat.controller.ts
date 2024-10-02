import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatCreateDTO } from './dtos/catCreateDTO';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  findAll() {
    return this.catService.getAll();
  }

  @Post()
  create(@Body() catCreate: CatCreateDTO) {
    return this.catService.create(catCreate);
  }
}
