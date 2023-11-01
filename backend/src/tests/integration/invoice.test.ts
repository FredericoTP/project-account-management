import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import app from '../../app';
import InvoiceModel from '../../database/models/InvoiceModel';
import {
  deleteInvoice,
  findAllAccountId,
  invalidDate,
  jwtValid,
  oneInvoice,
  patchInvoice,
  postInvoice,
  withoutDate,
  withoutExpenseId,
  withoutId,
  withoutInvoiceInfo,
  withoutValue,
} from './mocks/mockInvoice';

chai.use(chaiHttp);

const { expect } = chai;

describe('Invoice Router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /invoice', () => {
    describe('Call withou token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).get('/invoice');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).get('/invoice').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Succesfully returns all accountId invoices', () => {
      it('Should return 200 and invoices', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(InvoiceModel, 'findAll').resolves(findAllAccountId as InvoiceModel[]);

        const response = await chai.request(app).get('/invoice').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(findAllAccountId);
      });
    });
  });

  describe('POST /invoice', () => {
    describe('Call withou token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).post('/invoice');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).post('/invoice').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without expenseId', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/invoice')
          .set('Authorization', 'valid-token')
          .send(withoutExpenseId);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'expenseId is a required field' });
      });
    });

    describe('Call without value', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/invoice')
          .set('Authorization', 'valid-token')
          .send(withoutValue);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'value is a required field' });
      });
    });

    describe('Call without date', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/invoice')
          .set('Authorization', 'valid-token')
          .send(withoutDate);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'date is a required field' });
      });
    });

    describe('Call with invalid date', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/invoice')
          .set('Authorization', 'valid-token')
          .send(invalidDate);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: '"date" must be in YYYY-MM-DD format' });
      });
    });

    describe('Succesfully creates an invoice', () => {
      it('Should return 201 and invoice', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(InvoiceModel, 'create').resolves(oneInvoice as InvoiceModel);

        const response = await chai.request(app).post('/invoice')
          .set('Authorization', 'valid-token')
          .send(postInvoice);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(oneInvoice);
      });
    });
  });

  describe('PATCH /invoice', () => {
    describe('Call withou token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/invoice');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/invoice').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without id', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/invoice')
          .set('Authorization', 'valid-token')
          .send(withoutId);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'id is a required field' });
      });
    });

    describe('Call without invoiceInfo', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/invoice')
          .set('Authorization', 'valid-token')
          .send(withoutInvoiceInfo);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'invoiceInfo is a required field' });
      });
    });

    describe('Call with id that does not exist', () => {
      it('Should return 409 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(InvoiceModel, 'findOne').resolves(null);

        const response = await chai.request(app).patch('/invoice')
          .set('Authorization', 'valid-token')
          .send(patchInvoice);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.be.deep.equal({ message: 'Invoice does not exist' });
      });
    });

    describe('Succefully updates an invoice', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(InvoiceModel, 'findOne').resolves(oneInvoice as InvoiceModel);
        sinon.stub(InvoiceModel, 'create').resolves();

        const response = await chai.request(app).patch('/invoice')
          .set('Authorization', 'valid-token')
          .send(patchInvoice);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Invoice has been updated' });
      });
    });
  });

  describe('DELETE /invoice', () => {
    describe('Call withou token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).delete('/invoice');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).delete('/invoice').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without id', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).delete('/invoice')
          .set('Authorization', 'valid-token')
          .send(withoutId);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'id is a required field' });
      });
    });

    describe('Call with id that does not exist', () => {
      it('Should return 409 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(InvoiceModel, 'findOne').resolves(null);

        const response = await chai.request(app).delete('/invoice')
          .set('Authorization', 'valid-token')
          .send(deleteInvoice);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.be.deep.equal({ message: 'Invoice does not exist' });
      });
    });

    describe('Succefully deletes an invoice', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(InvoiceModel, 'findOne').resolves(oneInvoice as InvoiceModel);
        sinon.stub(InvoiceModel, 'destroy').resolves();

        const response = await chai.request(app).delete('/invoice')
          .set('Authorization', 'valid-token')
          .send(deleteInvoice);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Invoice has been deleted' });
      });
    });
  });
});
