import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':NIF')
  findOne(@Param('NIF') NIF: string) {
    return this.clientesService.findOne(NIF);
  }

  @Patch(':NIF')
  update(@Param('NIF') NIF: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(NIF, updateClienteDto);
  }

  @Delete(':NIF')
  remove(@Param('NIF') NIF: string) {
    return this.clientesService.remove(NIF);
  }
}
