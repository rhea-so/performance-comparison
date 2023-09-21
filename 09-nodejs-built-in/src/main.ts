import clustering from './clustering';
import { Entity, PrimaryKey, Property, MikroORM } from '@mikro-orm/core';

import http from 'http';

@Entity({ tableName: 'books' })
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ type: 'mediumtext' })
  content!: string;
}

async function bootstrap(): Promise<void> {
  const orm = await MikroORM.init({
    type: 'mariadb',
    host: '127.0.0.1',
    user: 'root',
    password: '123qwe',
    dbName: 'test',
    entities: [Book],
    pool: { min: 5, max: 100 },
  });

  const em = orm.em.fork();

  const repo = em.getRepository(Book);

  http
    .createServer(async (req, res) => {
      res.write(`${(await repo.find({})).length} selected.`);
      res.end();
    })
    .listen(3000);
}

clustering(bootstrap, 10);
