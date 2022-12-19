import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.login(loginUsuarioDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.authService.findOne(codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(codigo, updateAuthDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.authService.remove(codigo);
  }
}
