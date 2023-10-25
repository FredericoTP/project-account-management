import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import LoginService from '../../services/Login.service';
import { LoginController } from '../../controllers';
import JwtToken from '../../authentication/auth';
import { infoLogin } from './mocks/mockLogin';

chai.use(sinonChai);

const { expect } = chai;

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;
  let jwtToken: JwtToken;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    jwtToken = new JwtToken();
    loginService = new LoginService(jwtToken);
    loginController = new LoginController(loginService);
  });

  describe('Testing login method', () => {
    it('Successfully login and return a token', async () => {
      req.body = infoLogin;
      sinon.stub(loginService, 'login').resolves('fakeToken');

      await loginController.login(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ token: 'fakeToken' });
    });
  });
});
