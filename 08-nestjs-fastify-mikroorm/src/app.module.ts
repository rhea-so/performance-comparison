import { Module } from '@nestjs/common';
import { HelloWorldController } from './hello-world.controller';
import { Book } from './book.entity';
import { DBSelectController } from './db-select.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123qwe',
      dbName: 'test',
      entities: [Book],
      pool: { min: 5, max: 100 },
    }),
    MikroOrmModule.forFeature([Book]),
  ],
  controllers: [HelloWorldController, DBSelectController],
})
export class AppModule {}
