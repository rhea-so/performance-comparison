import Fastify from 'fastify';
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

const fastify = Fastify();

export class Book {
  id!: number;

  title!: string;

  content!: string;
}

async function bootstrap(): Promise<void> {
  fastify.get('/db', async function handler(request, reply) {
    return `${(await db('books').select()).length} selected.`;
  });

  await fastify.listen({ port: 3000 });
}

bootstrap();
