import clustering from './clustering';
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
  http
    .createServer(async (req, res) => {
      db('books')
        .select()
        .then((books) => {
          res.write(`${books.length} selected.`);
          res.end();
        });
    })
    .listen(3000);
}

clustering(bootstrap, 10);
