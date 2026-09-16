import { Module } from '@nestjs/common';
import { RepuestosController } from './repuestos.controller.js';
import { RepuestosService } from './repuestos.service.js';

@Module({
  controllers: [RepuestosController],
  providers: [RepuestosService]
})
export class RepuestosModule {}
