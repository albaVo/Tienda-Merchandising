import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientesService } from '../clientes/clientes.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { CategoriasService } from '../categorias/categorias.service';
import { ProductosService } from '../productos/productos.service';
import { DetallesPedidosService } from '../detalles_pedidos/detalles_pedidos.service';
import { PedidosService } from '../pedidos/pedidos.service';

import dataClientes from '../seed/data/clientes.json';
import dataUsuarios from '../seed/data/usuarios.json';
import dataProveedores from '../seed/data/proveedores.json';
import dataCategorias from '../seed/data/categorias.json';
import dataProductos from '../seed/data/productos.json';
import dataDetalles_Pedidos from '../seed/data/detalles_pedidos.json';
import dataPedidos from '../seed/data/pedidos.json';



@Injectable()
export class SeedService {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly authService: AuthService,
    private readonly proveedoresService: ProveedoresService,
    private readonly categoriasService: CategoriasService,
    private readonly productosService: ProductosService,
    private readonly detalles_pedidosService: DetallesPedidosService,
    private readonly pedidosService: PedidosService
  ) {}
  
 async runData() {
    //Insertar todos los datos
    await this.insertNewClientes();
    await this.insertNewUsuarios();
    await this.insertNewProveedores();
    await this.insertNewCategorias();
    await this.insertNewProductos();
    await this.insertNewDetalles_Pedidos();
    await this.insertNewPedidos();
    
    return 'Datos insertados con éxito'
  }

  private async insertNewClientes() {
    // Elimina primero los datos
    await this.clientesService.deleteAllClientes();

    const insertPromises = [];
    dataClientes.forEach((cliente) => {
      insertPromises.push(this.clientesService.create(cliente))
    })
    await Promise.all(insertPromises);
    return true;
  }

  private async insertNewUsuarios() {
    // Elimina primero los datos
    await this.authService.deleteAllUsuarios();

    const insertPromises = [];
    dataUsuarios.forEach((usuario) => {
      insertPromises.push(this.authService.create(usuario))
    })
    await Promise.all(insertPromises);
  }

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

  private async insertNewProductos() {
    // Elimina primero los datos
    await this.productosService.deleteAllProductos();

    const insertPromises = [];
    dataProductos.forEach((producto) => {
      insertPromises.push(this.productosService.create(producto))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewDetalles_Pedidos() {
    // Elimina primero los datos
    await this.detalles_pedidosService.deleteAllDetalles_Pedidos();

    const insertPromises = [];
    dataDetalles_Pedidos.forEach((detalles_pedido) => {
      insertPromises.push(this.detalles_pedidosService.create(detalles_pedido))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewPedidos() {
    // Elimina primero los datos
    await this.pedidosService.deleteAllPedidos();

    const insertPromises = [];
    dataPedidos.forEach((pedido) => {
      insertPromises.push(this.pedidosService.create(pedido))
    })
    await Promise.all(insertPromises);
    return true;
  }
}
