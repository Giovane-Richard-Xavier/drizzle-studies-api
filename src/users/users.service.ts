import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, count, asc, sql } from 'drizzle-orm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { petTable, usersTable } from 'src/db/schema';
import { db } from 'src/libs/drizzle';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto) {
    const newUser: typeof usersTable.$inferInsert = {
      name: dto.name,
      email: dto.email,
      age: dto.age,
    };

    const [user] = await db
      .insert(usersTable)
      .values(newUser)
      .onConflictDoNothing({ target: usersTable.email })
      .returning();

    if (!user) {
      throw new ConflictException('Email already registered.');
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

  async findAll(query: PaginationDto) {
    const { page, limit } = query;

    const offset = (page - 1) * limit;

    const [users, totalResult] = await Promise.all([
      db
        .select()
        .from(usersTable)
        .leftJoin(petTable, eq(petTable.ownerId, usersTable.id))
        .orderBy(asc(usersTable.id))
        .limit(limit)
        .offset(offset),

      db.select({ total: count() }).from(usersTable),
    ]);

    // total de registros
    const total = totalResult[0].total;

    // total pages
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
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
