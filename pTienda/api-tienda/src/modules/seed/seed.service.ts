import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientesService } from '../clientes/clientes.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import dataClientes from '../seed/data/clientes.json';
import dataUsuarios from '../seed/data/usuarios.json';
import dataProveedores from '../seed/data/proveedores.json';
import dataCategorias from '../seed/data/categorias.json';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly authService: AuthService,
    private readonly proveedoresService: ProveedoresService,
    private readonly categoriasService: CategoriasService
  ) {}
  
  runData() {
    //Insertar todos los datos
    // this.insertNewClientes();
    // this.insertNewUsuarios();
    this.insertNewProveedores();
    this.insertNewCategorias();
    
    return 'Datos insertados con éxito'
  }

  // private async insertNewClientes() {
  //   // Elimina primero los datos
  //   await this.clientesService.deleteAllClientes();

  //   const insertPromises = [];
  //   dataClientes.forEach((cliente) => {
  //     insertPromises.push(this.clientesService.create(cliente))
  //   })
  //   await Promise.all(insertPromises);
  //   return true;
  // }

  // private async insertNewUsuarios() {
  //   // Elimina primero los datos
  //   await this.authService.deleteAllUsuarios();

  //   const insertPromises = [];
  //   dataUsuarios.forEach((usuario) => {
  //     insertPromises.push(this.authService.create(usuario))
  //   })
  //   await Promise.all(insertPromises);
  // }

  private async insertNewProveedores() {
    // Elimina primero los datos
    await this.proveedoresService.deleteAllProveedores();

    const insertPromises = [];
    dataProveedores.forEach((proveedor) => {
      insertPromises.push(this.proveedoresService.create(proveedor))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewCategorias() {
    // Elimina primero los datos
    await this.categoriasService.deleteAllCategorias();

    const insertPromises = [];
    dataCategorias.forEach((categoria) => {
      insertPromises.push(this.categoriasService.create(categoria))
    })
    await Promise.all(insertPromises);
  }

}
