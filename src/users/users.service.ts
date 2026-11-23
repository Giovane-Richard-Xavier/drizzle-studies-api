import { BadRequestException, Injectable } from '@nestjs/common';
import { usersTable } from 'src/db/schema';
import { db } from 'src/libs/drizzle';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto) {
    type userInsert = typeof usersTable.$inferInsert;

    const newUser: userInsert = {
      name: dto.name,
      email: dto.email,
      age: dto.age,
    };

    const user = await db.insert(usersTable).values(newUser);

    if (!user) {
      throw new BadRequestException('Add user error!');
    }

    return {
      error: null,
      user,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
