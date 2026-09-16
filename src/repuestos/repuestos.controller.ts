import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { RepuestosService } from './repuestos.service.js';

@Controller('repuestos')
export class RepuestosController {
  constructor(private readonly repuestosService: RepuestosService) {}

  @Get()
  findAll() {
    return this.repuestosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.repuestosService.findOne(id);
  }

  @Post()
  create(
    @Body()
    data: {
      nombre: string;
      precio: number;
      stock?: number;
    },
  ) {
    return this.repuestosService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: {
      nombre?: string;
      precio?: number;
      stock?: number;
    },
  ) {
    return this.repuestosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.repuestosService.remove(id);
  }
}