import { Request, Response, NextFunction } from 'express';

const validateNewInvoice = (req: Request, res: Response, next: NextFunction) => {
  const { expenseId, value, date } = req.body;

  if (!expenseId) return res.status(400).json({ message: 'expenseId is a required field' });

  if (!value) return res.status(400).json({ message: 'value is a required field' });

  if (!date) return res.status(400).json({ message: 'date is a required field' });

  return next();
};

const validateUpdateInvoice = (req: Request, res: Response, next: NextFunction) => {
  const { id, invoiceInfo } = req.body;

  if (!id) return res.status(400).json({ message: 'id is a required field' });

  if (!invoiceInfo) return res.status(400).json({ message: 'invoiceInfo is a required field' });

  return next();
};

const validateDeleteInvoice = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'id is a required field' });

  return next();
};

export { validateDeleteInvoice, validateNewInvoice, validateUpdateInvoice };
