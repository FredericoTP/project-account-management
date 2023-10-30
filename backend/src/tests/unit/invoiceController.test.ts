import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import InvoiceService from '../../services/Invoice.service';
import { InvoiceController } from '../../controllers';
import InvoiceModel from '../../database/models/InvoiceModel';
import {
  createInvoiceReqParam, createdInvoice, updateInvoiceReqParam, deleteInvoiceReqParam,
} from './mocks/mockInvoice';

chai.use(sinonChai);

const { expect } = chai;

describe('InvoiceController', () => {
  let invoiceController: InvoiceController;
  let invoiceService: InvoiceService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    invoiceService = new InvoiceService();
    invoiceController = new InvoiceController(invoiceService);
  });

  describe('Testing create method', () => {
    it('Succesfully creates an invoice', async () => {
      req.body = createInvoiceReqParam;
      sinon.stub(invoiceService, 'create').resolves(createdInvoice as InvoiceModel);

      await invoiceController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdInvoice);
    });
  });

  describe('Testing update method', () => {
    it('Succesfully updates an invoice', async () => {
      req.body = updateInvoiceReqParam;
      sinon.stub(invoiceService, 'update').resolves();

      await invoiceController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Invoice has been updated' });
    });
  });

  describe('Testing delete method', () => {
    it('Succesfully deletes an invoice', async () => {
      req.body = deleteInvoiceReqParam;
      sinon.stub(invoiceService, 'delete').resolves();

      await invoiceController.delete(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Invoice has been deleted' });
    });
  });
});
