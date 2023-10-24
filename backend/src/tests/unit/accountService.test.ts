import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AccountModel from '../../database/models/AccountModel';
import AccountService from '../../services/Account.service';
import { BadRequest, Conflict } from '../../errors';
import {
  allAccounts, emptyParam, oneAccount, accountParams, returnCreate,
} from './mocks/mockAccount';

chai.use(sinonChai);

const { expect } = chai;

let accountService: AccountService;

describe('AccountService', () => {
  beforeEach(() => {
    accountService = new AccountService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing findAll method', () => {
    it('Should return all accounts', async () => {
      sinon.stub(AccountModel, 'findAll').resolves(allAccounts as AccountModel[]);

      const accounts = await accountService.findAll();

      expect(accounts).to.be.deep.equal(allAccounts);
    });
  });

  describe('Testing findByEmail method', () => {
    it('Should return all accounts', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(oneAccount as AccountModel);

      const account = await accountService.findByEmail(accountParams.email);

      expect(account).to.be.deep.equal(oneAccount);
    });
  });

  describe('Testing create method', () => {
    it('Should throw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await accountService.create(emptyParam);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Shoul throw an error when account already exists', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(oneAccount as AccountModel);

      try {
        await accountService.create(accountParams);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Account already exists');
    });

    it('Successfully creates an account', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(null);
      sinon.stub(AccountModel, 'create').resolves(returnCreate as AccountModel);

      const account = await accountService.create(accountParams);

      expect(account).to.be.deep.equal(returnCreate);
    });
  });

  describe('Testing updateName method', () => {
    it('Should throw an error if name is empty', async () => {
      let error = new Error();

      try {
        await accountService.updateName('', accountParams.email);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Successfully updates an account', async () => {
      const stub = sinon.stub(AccountModel, 'update').resolves();

      await accountService.updateName('Fred', accountParams.email);

      sinon.assert.callCount(stub, 1);
    });
  });

  describe('Testing updatePassword method', () => {
    it('Should throw an error if password is empty', async () => {
      let error = new Error();

      try {
        await accountService.updatePassword('', accountParams.email);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('password cannot be an empty field');
    });

    it('Should throw an error if password has less than 8 characters', async () => {
      let error = new Error();

      try {
        await accountService.updatePassword('1234567', accountParams.email);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('password should have a minimum length of 8');
    });

    it('Successfully updates an account', async () => {
      const stub = sinon.stub(AccountModel, 'update').resolves();

      await accountService.updatePassword('12345678', accountParams.email);

      sinon.assert.callCount(stub, 1);
    });
  });

  describe('Testing delete method', () => {
    it('Should throw an error if email is empty', async () => {
      let error = new Error();

      try {
        await accountService.delete('');
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('email cannot be an empty field');
    });

    it('Successfully delete an account', async () => {
      const stub = sinon.stub(AccountModel, 'update').resolves();

      await accountService.delete(accountParams.email);

      sinon.assert.callCount(stub, 1);
    });
  });
});
