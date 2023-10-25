import { Request, Response } from 'express';
import ExpenseService from '../services/Expense.service';

class ExpenseController {
  constructor(private expenseService = new ExpenseService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const expenses = await this.expenseService.findAll();

    return res.status(200).json(expenses);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { expense } = req.body;

    const newExpense = await this.expenseService.create(expense);

    return res.status(201).json(newExpense);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { oldExpense, newExpense } = req.body;

    await this.expenseService.update(oldExpense, newExpense);

    return res.status(200).json({ message: 'Expense has been updated' });
  }
}

export default ExpenseController;
