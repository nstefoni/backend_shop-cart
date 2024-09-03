import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users') //ruta del controlador.
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //se inyecta el servicio de 'UsersService'.

  @Post()
  async create(@Body() createUserDto: any) {
    //método para crear un nuevo usuario.
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }
}
