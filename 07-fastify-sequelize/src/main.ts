import Fastify from 'fastify';
import clustering from './clustering';
import { Column, Model, Sequelize, Table } from 'sequelize-typescript';

const fastify = Fastify();

@Table({ tableName: 'books', createdAt: false, updatedAt: false, deletedAt: false })
export class Book extends Model {
  @Column
  declare title: string;

  @Column({ type: 'mediumtext' })
  declare content: string;
}

async function bootstrap(): Promise<void> {
  new Sequelize({
    dialect: 'mariadb',
    host: '127.0.0.1',
    username: 'root',
    password: '123qwe',
    database: 'test',
    logging: false,
    models: [Book],
  });

  fastify.get('/db', async function handler(request, reply) {
    return `${(await Book.findAll({})).length} selected.`;
  });

  await fastify.listen({ port: 3000 });
}

clustering(bootstrap, 10);
