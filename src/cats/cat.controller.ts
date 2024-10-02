import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CatCreateDTO } from './dtos/catCreateDTO';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  findAll() {
    return this.catService.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catService.getOne(id);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.catService.deleteOne(id);
  }

  @Post()
  create(@Body() catCreate: CatCreateDTO) {
    return this.catService.create(catCreate);
  }
}
