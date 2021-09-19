import {
  Arg,
  Args,
  Authorized,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Book } from '../models/Book';
import { Role } from '../utils/ContextInterface';
import { GraphQLBoolean, GraphQLString } from 'graphql';
import BookAddArgs from '../otherClasses/BookAddArgs';
import { Op } from 'sequelize';
import IdArgs from '../otherClasses/IdArgs';
import BookEditArgs from '../otherClasses/BookEditArgs';

const bookNotFound = 'Book not found.';

@Resolver(Book)
export default class BookResolver {
  @Query(() => [Book])
  public async bookFindByAuthor (@Arg('author', () => GraphQLString) author: string) {
    const books = await Book.findAll({
      where: {
        author: {
          [Op.iLike]: '%' + author + '%'
        }
      },
    });

    if (!books) {
      throw new Error(bookNotFound);
    }

    return books;
  }

  @Query(() => [Book])
  public async bookFindByTitle (@Arg('title', () => GraphQLString) title: string) {
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: '%' + title + '%'
        }
      },
    });

    if (!books) {
      throw new Error(bookNotFound);
    }

    return books;
  }

  @Query(() => [Book])
  public async bookFindByTitleOrAuthor (@Arg('titleOrAuthor', () => GraphQLString) query: string) {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: '%' + query + '%'
            }
          },
          {
            author: {
              [Op.iLike]: '%' + query + '%'
            }
          }
        ]
      },
    });

    if (!books) {
      throw new Error(bookNotFound);
    }

    return books;
  }

  @Authorized([Role.USER])
  @Mutation(() => Book)
  public async bookAdd (@Args(() => BookAddArgs)
    {
      title,
      author,
      year,
      genres,
      rating
    }: BookAddArgs) {
    let book = await Book.findOne({ where: { title } });

    if (book) {
      throw new Error('Book already exists.');
    }

    // @ts-ignore
    book = await Book.create({
      title,
      author,
      year,
      genres,
      rating
    });

    return book;
  }

  @Authorized([Role.USER])
  @Mutation(() => Book)
  public async bookEdit (@Args(() => BookEditArgs)
    {
      id,
      title,
      author,
      year,
      genres,
      rating
    }: BookEditArgs) {
    const book = await Book.findOne({ where: { id } });

    if (!book) {
      throw new Error(bookNotFound);
    }

    await book.update({
      title,
      author,
      year,
      genres,
      rating
    });

    return book;
  }

  @Authorized([Role.USER])
  @Mutation(() => GraphQLBoolean)
  public async bookRemove (@Args(() => IdArgs) { id }: IdArgs) {
    const book = await Book.findOne({ where: { id } });

    if (!book) {
      throw new Error(bookNotFound);
    }

    await book.destroy();

    return true;
  }
}
