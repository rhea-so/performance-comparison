import { Module } from '@nestjs/common';
import { HelloWorldController } from './hello-world.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { DBSelectController } from './db-select.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123qwe',
      database: 'test',
      entities: [Book],
      synchronize: true,
      poolSize: 100,
    }),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [HelloWorldController, DBSelectController],
})
export class AppModule {}
