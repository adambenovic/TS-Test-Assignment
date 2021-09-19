import {
  Args,
  Authorized,
  Query,
  Resolver,
} from 'type-graphql';
import { BookHistory } from '../models/Book';
import IdArgs from '../otherClasses/IdArgs';
import { Role } from '../utils/ContextInterface';

const bookHistoryNotFound = 'Book history not found.';

@Resolver(BookHistory)
export default class BookHistoryResolver {
  @Authorized([Role.USER])
  @Query(() => [BookHistory])
  public async bookHistory (@Args(() => IdArgs) { id }: IdArgs) {
    const bookHistory = await BookHistory.findAll({
      where: { id },
    });

    if (!bookHistory) {
      throw new Error(bookHistoryNotFound);
    }

    return bookHistory;
  }
}
