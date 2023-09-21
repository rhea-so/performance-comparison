import { Controller, Get } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class DBSelectController {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  @Get('/db')
  async dbSelect(): Promise<string> {
    return `${(await this.repository.find()).length} selected.`;
  }
}
