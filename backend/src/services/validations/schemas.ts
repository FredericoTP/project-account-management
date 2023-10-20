import * as Joi from 'joi';
import {
  StringSchema, ObjectSchema, NumberSchema, DateSchema,
} from 'joi';

const customMessage = (fieldName: string, min: number, type: string) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const nameSchema: StringSchema = Joi.string().min(3).required().messages(customMessage('name', 3, 'string'));

const emailSchema: StringSchema = Joi.string().email().required().messages(customMessage('email', 5, 'string'));

const passwordSchema: StringSchema = Joi.string().min(8).required().messages(customMessage('password', 8, 'string'));

const accountSchema: ObjectSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema: ObjectSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const expenseSchema: StringSchema = Joi.string().min(3).required().messages(customMessage('expense', 3, 'string'));

const accountIdSchema: NumberSchema = Joi.number().required().messages(customMessage('accountId', 0, 'number'));

const expenseIdSchema: NumberSchema = Joi.number().required().messages(customMessage('expenseId', 0, 'number'));

const valueSchema: NumberSchema = Joi.number().min(0).required().messages(customMessage('value', 0, 'number'));

const descriptionSchema: StringSchema = Joi.string().messages(customMessage('description', 0, 'string'));

const dateSchema: DateSchema = Joi.date().iso().required().messages(customMessage('date', 0, 'date'));

const invoiceSchema: ObjectSchema = Joi.object({
  accountId: accountIdSchema,
  expenseId: expenseIdSchema,
  value: valueSchema,
  description: descriptionSchema,
  date: dateSchema,
});

const updateInvoiceSchema: ObjectSchema = Joi.object({
  expenseId: Joi.number().messages(customMessage('value', 0, 'number')),
  value: Joi.number().min(0).messages(customMessage('value', 0, 'number')),
  description: descriptionSchema,
  date: Joi.date().iso().messages(customMessage('date', 0, 'date')),
});

export {
  accountSchema,
  nameSchema,
  emailSchema,
  passwordSchema,
  loginSchema,
  expenseSchema,
  invoiceSchema,
  updateInvoiceSchema,
};
