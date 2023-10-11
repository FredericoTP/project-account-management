import { accountSchema, emailSchema } from './schemas';
import { IAccount } from '../../interfaces';
import { BadRequest } from '../../errors';

const validateNewAccount = (accountInfo: IAccount): void => {
  const { error } = accountSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateEmail = (email: string): void => {
  const { error } = emailSchema.validate(email);

  if (error) throw new BadRequest(error.message);
};

export { validateNewAccount, validateEmail };
