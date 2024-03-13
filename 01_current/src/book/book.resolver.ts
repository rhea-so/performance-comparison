import { Args, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly repo: BookRepository) {}

  @Query(() => Book)
  async book(@Args('id') id: number): Promise<Book> {
    return this.repo.findOne(id);
  }
}
