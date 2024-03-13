import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'books' })
export class Book extends Model {
  @Field(() => ID)
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Field(() => Date)
  @Column({ field: 'created_at' }) //
  createdAt: Date;

  @Field(() => Date)
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  title: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  author: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  description: string;
}
