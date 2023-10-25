import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ExpenseService from '../../services/Expense.service';
import { ExpenseController } from '../../controllers';
import ExpenseModel from '../../database/models/ExpenseModel';
import {
  allExpenses, createParamExpense, returnCreate, updateParamExpense,
} from './mocks/mockExpense';

chai.use(sinonChai);

const { expect } = chai;

describe('ExpenseController', () => {
  let expenseController: ExpenseController;
  let expenseService: ExpenseService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    expenseService = new ExpenseService();
    expenseController = new ExpenseController(expenseService);
  });

  describe('Testing findAll method', () => {
    it('Succesfully returns all expenses', async () => {
      sinon.stub(expenseService, 'findAll').resolves(allExpenses as ExpenseModel[]);

      await expenseController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allExpenses);
    });
  });

  describe('Testing create method', () => {
    it('Successfully creates an expense', async () => {
      req.body = createParamExpense;
      sinon.stub(expenseService, 'create').resolves(returnCreate as ExpenseModel);

      await expenseController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(returnCreate);
    });
  });

  describe('Testing update method', () => {
    it('Succesfully updates an expense', async () => {
      req.body = updateParamExpense;
      sinon.stub(expenseService, 'update').resolves();

      await expenseController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Expense has been updated' });
    });
  });
});
