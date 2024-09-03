import { Injectable } from '@nestjs/common';
import { createUser, findUserByUsername } from '../utils/databaseUtils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  //servicio de usuarios.
  async findOne(username: string) {
    return findUserByUsername(username);
  }

  async create(createUserDto: any) {
    //método para crear un nuevo usuario.
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await createUser(createUserDto.username, hashedPassword);
    return newUser;
  }
}
