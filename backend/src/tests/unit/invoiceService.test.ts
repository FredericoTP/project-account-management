import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import InvoiceService from '../../services/Invoice.service';
import InvoiceModel from '../../database/models/InvoiceModel';
import { BadRequest, Conflict } from '../../errors';
import {
  emptyInvoiceParam,
  invalidDate,
  createdInvoice,
  validInvoice,
  accountIdInvoices,
  invalidParam,
  validUpdate,
} from './mocks/mockInvoice';

chai.use(sinonChai);

const { expect } = chai;

describe('InvoiceService', () => {
  let invoiceService: InvoiceService;

  beforeEach(() => {
    invoiceService = new InvoiceService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing create method', () => {
    it('Should throw an error if a field is empty', async () => {
      let error = new Error();

      try {
        await invoiceService.create(emptyInvoiceParam);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('description cannot be an empty field');
    });

    it('Should throw an error if date has a wrong format', async () => {
      let error = new Error();

      try {
        await invoiceService.create(invalidDate);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('"date" must be in YYYY-MM-DD format');
    });

    it('Succesfully creates an invoice', async () => {
      sinon.stub(InvoiceModel, 'create').resolves(createdInvoice as InvoiceModel);

      const invoice = await invoiceService.create(validInvoice);

      expect(invoice).to.be.deep.equal(createdInvoice);
    });
  });

  describe('Testing findByAccountId method', () => {
    it('Succesfully returns all invoice of the accountId', async () => {
      sinon.stub(InvoiceModel, 'findAll').resolves(accountIdInvoices as InvoiceModel[]);

      const invoices = await invoiceService.findByAccountId(1);

      expect(invoices).to.be.deep.equal(accountIdInvoices);
    });
  });

  describe('Testing update method', () => {
    it('Should throw an error if a field is empty', async () => {
      let error = new Error();

      try {
        await invoiceService.update(1, invalidParam);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('description cannot be an empty field');
    });

    it('Should throw an error if invoice does not exist', async () => {
      let error = new Error();
      sinon.stub(InvoiceModel, 'findOne').resolves(null);

      try {
        await invoiceService.update(1, validUpdate);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Invoice does not exist');
    });

    it('Succesfully updates an invoice', async () => {
      sinon.stub(InvoiceModel, 'findOne').resolves(createdInvoice as InvoiceModel);
      const stub = sinon.stub(InvoiceModel, 'update').resolves();

      await invoiceService.update(1, validUpdate);

      sinon.assert.callCount(stub, 1);
    });
  });

  describe('Testing delete method', () => {
    it('Should throw an error if invoice does not exist', async () => {
      let error = new Error();
      sinon.stub(InvoiceModel, 'findOne').resolves(null);

      try {
        await invoiceService.delete(1);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Invoice does not exist');
    });

    it('Succesfully deletes an invoice', async () => {
      sinon.stub(InvoiceModel, 'findOne').resolves(createdInvoice as InvoiceModel);
      const stub = sinon.stub(InvoiceModel, 'destroy').resolves();

      await invoiceService.delete(1);

      sinon.assert.callCount(stub, 1);
    });
  });
});
