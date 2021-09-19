import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { GraphQLInt, GraphQLString } from 'graphql';

@ArgsType()
export default class BookAddArgs {
  @Field(() => GraphQLString)
  @Length(1, 60)
  public title!: string;

  @Field(() => GraphQLString)
  public author: string | undefined;

  @Field(() => GraphQLInt)
  public year: number | undefined;

  @Field(() => GraphQLString)
  public genres: string | undefined;

  @Field(() => GraphQLInt)
  public rating: number | undefined;
}
