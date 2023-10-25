import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import AccountService from '../../services/Account.service';
import { AccountController } from '../../controllers';
import {
  allAccounts, accountParams, returnCreate, reqParam,
} from './mocks/mockAccount';
import AccountModel from '../../database/models/AccountModel';

chai.use(sinonChai);

const { expect } = chai;

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    accountService = new AccountService();
    accountController = new AccountController(accountService);
  });

  describe('Testing findAll method', () => {
    it('Successfully returns all account', async () => {
      sinon.stub(accountService, 'findAll').resolves(allAccounts as AccountModel[]);

      await accountController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allAccounts);
    });
  });

  describe('Testing create method', () => {
    it('Successfully creates an account', async () => {
      req.body = accountParams;
      sinon.stub(accountService, 'create').resolves(returnCreate as AccountModel);

      await accountController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(returnCreate);
    });
  });

  describe('Testing updateName method', () => {
    it('Succesfully updates an account', async () => {
      req.body = reqParam;
      sinon.stub(accountService, 'updateName').resolves();

      await accountController.updateName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Account has been updated' });
    });
  });

  describe('Testing updatePassword method', () => {
    it('Succesfully updates an account', async () => {
      req.body = reqParam;
      sinon.stub(accountService, 'updatePassword').resolves();

      await accountController.updatePassword(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Password has been updated' });
    });
  });

  describe('Testing delete method', () => {
    it('Succesfully deletes an account', async () => {
      req.body = reqParam;
      sinon.stub(accountService, 'delete').resolves();

      await accountController.delete(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Account has been deleted' });
    });
  });
});
