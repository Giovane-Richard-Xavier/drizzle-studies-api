import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const petTable = pgTable('pets', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 150 }).notNull(),
  ownerId: uuid()
    .notNull()
    .references(() => usersTable.id), // 1:N
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
