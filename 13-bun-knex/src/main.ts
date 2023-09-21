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

import http from 'http';

export class Book {
  id!: number;

  title!: string;

  content!: string;
}

async function bootstrap(): Promise<void> {
  Bun.serve({
    port: 3000,
    async fetch(req) {
      return new Response(`${(await db('books').select()).length} selected.`);
    },
  });
}

bootstrap();
