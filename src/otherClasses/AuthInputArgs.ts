import { IsEmail, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { GraphQLString } from 'graphql';

@ArgsType()
export default class AuthInputArgs {
  @Field(() => GraphQLString)
  @IsEmail()
  public email!: string;

  @Field(() => GraphQLString)
  @Length(8, 255)
  public password!: string;
}
