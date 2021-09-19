import { AuthChecker } from 'type-graphql';
import { IContext } from './ContextInterface';

export const customAuthChecker: AuthChecker<IContext> = (
  { root, args, context, info },
  roles,
) => {
  const { user } = context;

  if (roles.length === 0) {
    return user !== undefined;
  }

  if (!user) {
    return false;
  }

  return roles.includes(user.role);
};
