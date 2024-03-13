import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookRepository implements OnApplicationBootstrap {
  constructor(@InjectModel(Book) private readonly repo: typeof Book) {}

  async onApplicationBootstrap(): Promise<void> {
    setTimeout(async () => {
      const book: Book = new Book({ title: '1984', author: 'George Orwell', description: 'Winston Smith wrestles with oppression in Oceania' });
      await book.save();
    }, 1000);
    // await this.repo.bulkCreate([
    //   { title: '1984', author: 'George Orwell', description: 'Winston Smith wrestles with oppression in Oceania' },
    //   { title: 'Brave New World', author: 'Aldous Huxley', description: 'Dystopian novel by English author Aldous Huxley' },
    //   { title: 'Fahrenheit 451', author: 'Ray Bradbury', description: 'A dystopian novel by American writer Ray Bradbury' },
    // ]);
  }

  async findOne(id: number): Promise<Book> {
    return this.repo.findByPk(id);
  }
}
