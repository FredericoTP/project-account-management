import * as chai from 'chai';
import * as sinon from 'sinon';
import bcrypt = require('bcryptjs');
import sinonChai from 'sinon-chai';
import LoginService from '../../services/Login.service';
import AccountModel from '../../database/models/AccountModel';
import JwtToken from '../../authentication/auth';
import { BadRequest, Unauthorized } from '../../errors';
import {
  emptyLogin, infoLogin, infoAccount, falseAccount,
} from './mocks/mockLogin';

chai.use(sinonChai);

const { expect } = chai;

describe('LoginService', () => {
  let loginService: LoginService;
  let jwtToken: JwtToken;

  beforeEach(() => {
    sinon.restore();
    jwtToken = new JwtToken();
    loginService = new LoginService(jwtToken);
  });

  describe('Testing login method', () => {
    it('Should thorw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await loginService.login(emptyLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('email cannot be an empty field');
    });

    it('Should throw an error if account does not exist', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(null);

      try {
        await loginService.login(infoLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid email or password');
    });

    it('Should throw an error when password is wrong', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(infoAccount as AccountModel);
      sinon.stub(bcrypt, 'compareSync').returns(false);

      try {
        await loginService.login(infoLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid email or password');
    });

    it('Should throw an error when account status is false', async () => {
      let error = new Error();
      sinon.stub(AccountModel, 'findOne').resolves(falseAccount as AccountModel);
      sinon.stub(bcrypt, 'compareSync').returns(true);

      try {
        await loginService.login(infoLogin);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid email or password');
    });

    it('Successfully login and returns a token', async () => {
      sinon.stub(AccountModel, 'findOne').resolves(infoAccount as AccountModel);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwtToken, 'generateToken').callsFake(() => 'abc');

      const token = await loginService.login(infoLogin);

      expect(token).to.be.equal('abc');
    });
  });
});
