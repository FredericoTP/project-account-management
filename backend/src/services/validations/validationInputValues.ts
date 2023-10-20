import {
  accountSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  loginSchema,
  expenseSchema,
  invoiceSchema,
  updateInvoiceSchema,
} from './schemas';
import {
  IAccount, ILogin, INewInvoice, IUpdateInvoice,
} from '../../interfaces';
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

const validateInvoice = (invoiceInfo: INewInvoice): void => {
  const { error } = invoiceSchema.validate(invoiceInfo);

  if (error) throw new BadRequest(error.message);
};

const validateUpdateInvoice = (invoiceInfo: IUpdateInvoice): void => {
  const { error } = updateInvoiceSchema.validate(invoiceInfo);

  if (error) throw new BadRequest(error.message);
};

export {
  validateNewAccount,
  validateEmail,
  validateName,
  validatePassword,
  validateLogin,
  validateExpense,
  validateInvoice,
  validateUpdateInvoice,
};
