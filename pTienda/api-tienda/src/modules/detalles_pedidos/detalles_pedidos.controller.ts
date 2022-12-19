import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetallesPedidosService } from './detalles_pedidos.service';
import { CreateDetallesPedidoDto } from './dto/create-detalles_pedido.dto';
import { UpdateDetallesPedidoDto } from './dto/update-detalles_pedido.dto';

@Controller('detalles-pedidos')
export class DetallesPedidosController {
  constructor(
    private readonly detallesPedidosService: DetallesPedidosService,
  ) {}

  @Post()
  async create(@Body() createDetallesPedidoDto: CreateDetallesPedidoDto) {
    return this.detallesPedidosService.create(createDetallesPedidoDto);
  }

  @Get()
  findAll() {
    return this.detallesPedidosService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.detallesPedidosService.findOne(codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateDetallesPedidoDto: UpdateDetallesPedidoDto,
  ) {
    return this.detallesPedidosService.update(codigo, updateDetallesPedidoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.detallesPedidosService.remove(codigo);
  }
}
