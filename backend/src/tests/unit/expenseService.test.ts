import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ExpenseModel from '../../database/models/ExpenseModel';
import ExpenseService from '../../services/Expense.service';
import { BadRequest, Conflict } from '../../errors';
import { allExpenses, oneExpense } from './mocks/mockExpense';

chai.use(sinonChai);

const { expect } = chai;

describe('ExpenseService', () => {
  let expenseService: ExpenseService;

  beforeEach(() => {
    expenseService = new ExpenseService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing findAll method', () => {
    it('Should return all expenses', async () => {
      sinon.stub(ExpenseModel, 'findAll').resolves(allExpenses as ExpenseModel[]);

      const expenses = await expenseService.findAll();

      expect(expenses).to.be.deep.equal(allExpenses);
    });
  });

  describe('Testing findExpense method', () => {
    it('Should return an expense', async () => {
      sinon.stub(ExpenseModel, 'findOne').resolves(oneExpense as ExpenseModel);

      const expense = await expenseService.findExpense('Alimentação');

      expect(expense).to.be.deep.equal(oneExpense);
    });
  });

  describe('Testing create method', () => {
    it('Should throw an error when expense is empty', async () => {
      let error = new Error();

      try {
        await expenseService.create('');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('expense cannot be an empty field');
    });

    it('Should throw an error when expense has less than 3 characters', async () => {
      let error = new Error();

      try {
        await expenseService.create('ab');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('expense should have a minimum length of 3');
    });

    it('Should throw an error if expense already exists', async () => {
      let error = new Error();
      sinon.stub(ExpenseModel, 'findOne').resolves(oneExpense as ExpenseModel);

      try {
        await expenseService.create('Alimentação');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Expense already exists');
    });

    it('Successfully creates an expense', async () => {
      sinon.stub(ExpenseModel, 'findOne').resolves(null);
      sinon.stub(ExpenseModel, 'create').resolves(oneExpense as ExpenseModel);

      const newExpense = await expenseService.create('Alimentação');

      expect(newExpense).to.be.deep.equal(oneExpense);
    });
  });

  describe('Testing update method', () => {
    it('Should throw an error when newExpense is empty', async () => {
      let error = new Error();

      try {
        await expenseService.update('', '');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('expense cannot be an empty field');
    });

    it('Should throw an error when newExpense has less than 3 characters', async () => {
      let error = new Error();

      try {
        await expenseService.update('', 'ab');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('expense should have a minimum length of 3');
    });

    it('Should throw an error if oldExpense does not exist', async () => {
      let error = new Error();
      sinon.stub(ExpenseModel, 'findOne').resolves(null);

      try {
        await expenseService.update('Alimentação', 'Energia');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Expense doesn\'t exist');
    });

    it('Successfully updates an expense', async () => {
      sinon.stub(ExpenseModel, 'findOne').resolves(oneExpense as ExpenseModel);
      const stub = sinon.stub(ExpenseModel, 'update').resolves();

      await expenseService.update('Alimentação', 'Energia');

      sinon.assert.callCount(stub, 1);
    });
  });
});
