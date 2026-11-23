import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { usersTable } from 'src/db/schema';
import { db } from 'src/libs/drizzle';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';

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

  async findUserByEmail(email: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findAll() {
    const users = await db.select().from(usersTable);

    return users;
  }

  async findOne(id: string) {
    // SELECT  FROM table WHERE id = x
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // verifica se usuário existe
    const userExist = await this.findOne(id);

    if (!userExist) {
      throw new NotFoundException('User not found.');
    }

    // UPDATE Table SET campo = WHERE id = x
    const [userUpdated] = await db
      .update(usersTable)
      .set({
        ...updateUserDto,
      })
      .where(eq(usersTable.id, id))
      .returning();

    return userUpdated;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
