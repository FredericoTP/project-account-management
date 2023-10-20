import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { InvoiceController } from '../controllers';
import {
  validateToken, validateNewInvoice, validateDeleteInvoice, validateUpdateInvoice,
} from '../middlewares';

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

invoiceRouter.post('/', validateToken, validateNewInvoice, (req: Request, res: Response) => invoiceController.create(req, res));

invoiceRouter.patch('/', validateToken, validateUpdateInvoice, (req: Request, res: Response) => invoiceController.update(req, res));

invoiceRouter.delete('/', validateToken, validateDeleteInvoice, (req: Request, res: Response) => invoiceController.delete(req, res));

export default invoiceRouter;
