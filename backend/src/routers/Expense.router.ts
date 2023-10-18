import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { ExpenseController } from '../controllers';
import { validateToken, validateNewExpense, validateUpdateExpense } from '../middlewares';

const expenseRouter = Router();
const expenseController = new ExpenseController();

expenseRouter.get('/', (req: Request, res: Response) => expenseController.findAll(req, res));

expenseRouter.post('/', validateToken, validateNewExpense, (req: Request, res: Response) => expenseController.create(req, res));

expenseRouter.patch('/', validateToken, validateUpdateExpense, (req: Request, res: Response) => expenseController.update(req, res));

export default expenseRouter;
