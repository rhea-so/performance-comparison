import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookResolver } from './book/book.resolver';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './book/book.entity';
import { BookRepository } from './book/book.repository';

@Module({
  imports: [
    GraphQLModule.forRoot({ driver: ApolloFederationDriver, autoSchemaFile: 'schema.gql' }),
    SequelizeModule.forRoot({ dialect: 'sqlite', storage: ':memory:', models: [Book], sync: { force: true } }),
    SequelizeModule.forFeature([Book]),
  ],
  providers: [BookResolver, BookRepository],
})
export class AppModule {}
