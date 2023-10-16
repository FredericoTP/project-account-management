import { Request, Response, NextFunction } from 'express';

const validateUpdateName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is a required field' });

  return next();
};

const validateUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'Password is a required field' });

  return next();
};

export { validateUpdateName, validateUpdatePassword };
