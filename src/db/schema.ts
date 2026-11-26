import { relations } from 'drizzle-orm';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { integer, pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

const rolesEnum = pgEnum('role', ['USER', 'ADMIN']);

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
};

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  role: rolesEnum().default('USER'),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  balance: integer().default(100),
  ...timestamps,
});

export const petTable = pgTable('pets', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 150 }).notNull(),
  ownerId: uuid()
    .notNull()
    .references(() => usersTable.id), // 1:N
  ...timestamps,
});

export const userRelations = relations(usersTable, ({ many }) => ({
  pets: many(petTable),
}));

export const petsRelations = relations(petTable, ({ one }) => ({
  owner: one(usersTable, {
    fields: [petTable.ownerId],
    references: [usersTable.id],
  }),
}));
