import { Request, Response, NextFunction } from 'express';

const validateNewExpense = (req: Request, res: Response, next: NextFunction) => {
  const { expense } = req.body;

  if (!expense) return res.status(400).json({ message: 'expense is a required field' });

  return next();
};

const validateUpdateExpense = (req: Request, res: Response, next: NextFunction) => {
  const { oldExpense, newExpense } = req.body;

  if (!oldExpense) return res.status(400).json({ message: 'oldExpense is a required field' });

  if (!newExpense) return res.status(400).json({ message: 'newExpense is a required field' });

  return next();
};

export { validateNewExpense, validateUpdateExpense };
