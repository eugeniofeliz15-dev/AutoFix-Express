import { Module } from '@nestjs/common';
import { RepuestosModule } from './repuestos/repuestos.module.js';

@Module({
  imports: [RepuestosModule]
})
export class AppModule {}