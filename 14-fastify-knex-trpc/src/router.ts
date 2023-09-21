import { initTRPC } from '@trpc/server';
import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123qwe',
    database: 'test',
    pool: { min: 5, max: 100 },
  },
});

export const t = initTRPC.create();
export const appRouter = t.router({
  books: t.procedure.query(async () => {
    return `${(await db('books').select()).length} selected.`;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
