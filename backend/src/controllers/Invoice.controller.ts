import { Request, Response } from 'express';
import InvoiceService from '../services/Invoice.service';
import { INewInvoice, IUpInvoiceReq } from '../interfaces';

class InvoiceController {
  constructor(private invoiceService = new InvoiceService()) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const invoiceInfo: INewInvoice = req.body;

    const newInvoice = await this.invoiceService.create(invoiceInfo);

    return res.status(201).json(newInvoice);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const info: IUpInvoiceReq = req.body;

    await this.invoiceService.update(info.id, info.invoiceInfo);

    return res.status(200).json({ message: 'Account has been updated' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await this.invoiceService.delete(id);

    return res.status(200).json({ message: 'Invoice has been deleted' });
  }
}

export default InvoiceController;
