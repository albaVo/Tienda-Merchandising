import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';

@Injectable()
export class ProveedoresService {

  constructor(
    @InjectRepository(Proveedore)
    private readonly proveedorRepository: Repository<Proveedore>
  ){}

  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      await this.proveedorRepository.save(proveedor);
      return proveedor;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!')
    }
  }

  findAll() {
    return this.proveedorRepository.find({});
  }

  findOne(codigo: string) {
    return this.proveedorRepository.find({
      where: {codigo}
    })
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}
