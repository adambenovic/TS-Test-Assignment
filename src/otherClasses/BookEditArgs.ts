import { ArgsType, Field } from 'type-graphql';
import { GraphQLString } from 'graphql';
import BookAddArgs from './BookAddArgs';

@ArgsType()
export default class BookEditArgs extends BookAddArgs {
  @Field(() => GraphQLString)
  public id!: string;
}
