import { Request, Response } from 'express';
import InvoiceService from '../services/Invoice.service';
import { INewInvoiceReq, IUpInvoiceReq } from '../interfaces';

class InvoiceController {
  constructor(private invoiceService = new InvoiceService()) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const invoiceInfo: INewInvoiceReq = req.body;
    const {
      infoToken, expenseId, value, description, date,
    } = invoiceInfo;

    const newInvoice = await this.invoiceService.create({
      accountId: infoToken.id, expenseId, value, description, date,
    });

    return res.status(201).json(newInvoice);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const info: IUpInvoiceReq = req.body;

    await this.invoiceService.update(info.id, info.invoiceInfo);

    return res.status(200).json({ message: 'Invoice has been updated' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await this.invoiceService.delete(id);

    return res.status(200).json({ message: 'Invoice has been deleted' });
  }
}

export default InvoiceController;
