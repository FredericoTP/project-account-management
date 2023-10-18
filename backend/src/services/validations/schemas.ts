import * as Joi from 'joi';
import { StringSchema, ObjectSchema } from 'joi';

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

export {
  accountSchema, nameSchema, emailSchema, passwordSchema, loginSchema, expenseSchema,
};
