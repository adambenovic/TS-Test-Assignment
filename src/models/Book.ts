import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Field, GraphQLISODateTime, ObjectType } from 'type-graphql';
import { GraphQLInt, GraphQLString } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
@Table
export class Book extends Model<Book> {
  @Field(() => GraphQLString)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Field(() => GraphQLString)
  @Unique
  @Column(DataType.STRING)
  public title!: string;

  @Field(() => GraphQLString)
  @Column(DataType.STRING)
  public author: string | undefined;

  @Field(() => GraphQLInt)
  @Column(DataType.INTEGER)
  public year: number | undefined;

  @Field(() => GraphQLJSON)
  @Column(DataType.JSON)
  public genres: string | undefined;

  @Field(() => GraphQLInt)
  @Column(DataType.INTEGER)
  public rating: number | undefined;

  @Field(() => GraphQLISODateTime)
  @CreatedAt
  public createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdatedAt
  public updatedAt!: Date;
}

@ObjectType()
export class BookHistory extends Book {
  @Field(() => GraphQLISODateTime)
  public readonly archivedAt!: Date;

  public readonly transactionId!: string;

  public readonly eventId!: string;

  public readonly deletion!: boolean;
}
