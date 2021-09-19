import { ArgsType, Field } from 'type-graphql';
import { GraphQLString } from 'graphql';

@ArgsType()
export default class IdArgs {
  @Field(() => GraphQLString)
  public id!: string;
}
