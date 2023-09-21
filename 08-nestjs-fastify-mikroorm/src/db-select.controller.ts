import { Controller, Get } from '@nestjs/common';
import { Book } from './book.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Controller()
export class DBSelectController {
  constructor(
    @InjectRepository(Book)
    private repository: EntityRepository<Book>
  ) {}

  @Get('/db')
  async dbSelect(): Promise<string> {
    return `${(await this.repository.findAll()).length} selected.`;
  }
}
