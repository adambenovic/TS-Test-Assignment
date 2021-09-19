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
import { GraphQLString } from 'graphql';

@ObjectType()
@Table
export default class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Field(() => GraphQLString)
  @Unique
  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public password!: string;

  @Field(() => GraphQLISODateTime)
  @CreatedAt
  public createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  @UpdatedAt
  public updatedAt!: Date;
}
