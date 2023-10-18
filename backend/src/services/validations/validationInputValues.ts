import {
  accountSchema, emailSchema, nameSchema, passwordSchema, loginSchema, expenseSchema,
} from './schemas';
import { IAccount, ILogin } from '../../interfaces';
import { BadRequest } from '../../errors';

const validateNewAccount = (accountInfo: IAccount): void => {
  const { error } = accountSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateEmail = (email: string): void => {
  const { error } = emailSchema.validate(email);

  if (error) throw new BadRequest(error.message);
};

const validateName = (name: string): void => {
  const { error } = nameSchema.validate(name);

  if (error) throw new BadRequest(error.message);
};

const validatePassword = (password: string): void => {
  const { error } = passwordSchema.validate(password);

  if (error) throw new BadRequest(error.message);
};

const validateLogin = (accountInfo: ILogin): void => {
  const { error } = loginSchema.validate(accountInfo);

  if (error) throw new BadRequest(error.message);
};

const validateExpense = (expense: string): void => {
  const { error } = expenseSchema.validate(expense);

  if (error) throw new BadRequest(error.message);
};

export {
  validateNewAccount, validateEmail, validateName, validatePassword, validateLogin, validateExpense,
};
