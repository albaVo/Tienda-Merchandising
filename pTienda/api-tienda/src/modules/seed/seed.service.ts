import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ClientesService } from '../clientes/clientes.service';
import dataClientes from '../seed/data/clientes.json';
import dataUsuarios from '../seed/data/usuarios.json';

@Injectable()
export class SeedService {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly authService: AuthService
  ) {}
  
  runData() {
    this.clientesService.deleteAllClientes();
    this.insertNewClientes();
    this.authService.deleteAllUsuarios();
    this.insertNewUsuarios();
    console.log(dataClientes && dataUsuarios)
    return (dataClientes && dataUsuarios);
  }

  private async insertNewClientes() {
    const insertPromises = [];
    dataClientes.forEach((cliente) => {
      insertPromises.push(this.clientesService.create(cliente))
    })
    await Promise.all(insertPromises);
  }

  private async insertNewUsuarios() {
    const insertPromises = [];
    dataUsuarios.forEach((usuario) => {
      insertPromises.push(this.authService.create(usuario))
    })
    await Promise.all(insertPromises);
  }
}
