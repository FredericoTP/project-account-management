import { ModelStatic } from 'sequelize';
import InvoiceModel from '../database/models/InvoiceModel';
import ExpenseModel from '../database/models/ExpenseModel';
import { INewInvoice, IUpdateInvoice } from '../interfaces';
import { validateInvoice, validateUpdateInvoice } from './validations/validationInputValues';
import { Conflict } from '../errors';

class InvoiceService {
  private invoiceModel: ModelStatic<InvoiceModel>;

  constructor() {
    this.invoiceModel = InvoiceModel;
  }

  public async create(invoiceInfo: INewInvoice): Promise<InvoiceModel> {
    validateInvoice(invoiceInfo);

    const invoice = await this.invoiceModel.create({ ...invoiceInfo });

    return invoice;
  }

  public async findByAccountId(accountId: number): Promise<InvoiceModel[]> {
    const invoices = await this.invoiceModel.findAll({
      where: { accountId },
      include: [{
        model: ExpenseModel,
        as: 'expense',
        attributes: ['expense'],
      }],
      attributes: {
        exclude: ['expenseId'],
      },
    });

    return invoices;
  }

  public async update(id: number, invoiceInfo: IUpdateInvoice): Promise<void> {
    validateUpdateInvoice(invoiceInfo);

    const checkInvoice = await this.invoiceModel.findOne(
      { where: { id } },
    );

    if (!checkInvoice) throw new Conflict('Invoice does not exist');

    await this.invoiceModel.update(
      { ...invoiceInfo },
      { where: { id } },
    );
  }

  public async delete(id: number): Promise<void> {
    const checkInvoice = await this.invoiceModel.findOne(
      { where: { id } },
    );

    if (!checkInvoice) throw new Conflict('Invoice does not exist');

    await this.invoiceModel.destroy({
      where: { id },
    });
  }
}

export default InvoiceService;
