import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import app from '../../app';
import ExpenseModel from '../../database/models/ExpenseModel';
import {
  findAllExpenses, findOneExpense, jwtValid, newExpense, updateExpense, withoutNew, withoutOld,
} from './mocks/mockExpense';

chai.use(chaiHttp);

const { expect } = chai;

describe('Expense Router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /expense', () => {
    describe('Succesfully returns all expenses', () => {
      it('Should return 200 and expenses', async () => {
        sinon.stub(ExpenseModel, 'findAll').resolves(findAllExpenses as ExpenseModel[]);

        const response = await chai.request(app).get('/expense');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(findAllExpenses);
      });
    });
  });

  describe('POST /expense', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).post('/expense');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).post('/expense').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without expense', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).post('/expense').set('Authorization', 'valid-token');

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'expense is a required field' });
      });
    });

    describe('Call with an expense that already exists', () => {
      it('Should return 409 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(ExpenseModel, 'findOne').resolves(findOneExpense as ExpenseModel);

        const response = await chai.request(app).post('/expense')
          .set('Authorization', 'valid-token')
          .send(newExpense);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.be.deep.equal({ message: 'Expense already exists' });
      });
    });

    describe('Succesfully creates an expense', () => {
      it('Should return 201 and the expense', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(ExpenseModel, 'findOne').resolves(null);
        sinon.stub(ExpenseModel, 'create').resolves(newExpense as ExpenseModel);

        const response = await chai.request(app).post('/expense')
          .set('Authorization', 'valid-token')
          .send(newExpense);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(newExpense);
      });
    });
  });

  describe('PATCH /expense', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/expense');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/expense').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without oldExpense', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/expense')
          .set('Authorization', 'valid-token')
          .send(withoutOld);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'oldExpense is a required field' });
      });
    });

    describe('Call without newExpense', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/expense')
          .set('Authorization', 'valid-token')
          .send(withoutNew);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'newExpense is a required field' });
      });
    });

    describe('Call with expense that does not exist', () => {
      it('Should return 409 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(ExpenseModel, 'findOne').resolves(null);

        const response = await chai.request(app).patch('/expense')
          .set('Authorization', 'valid-token')
          .send(updateExpense);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.be.deep.equal({ message: 'Expense doesn\'t exist' });
      });
    });

    describe('Succesfully updates an expense', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(ExpenseModel, 'findOne').resolves(findOneExpense as ExpenseModel);
        sinon.stub(ExpenseModel, 'update').resolves();

        const response = await chai.request(app).patch('/expense')
          .set('Authorization', 'valid-token')
          .send(updateExpense);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Expense has been updated' });
      });
    });
  });
});
