import { Field, ObjectType } from 'type-graphql';
import { GraphQLString } from 'graphql';

@ObjectType()
export default class Token {
  @Field(() => GraphQLString)
  public token!: string;
}
