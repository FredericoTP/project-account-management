import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import app from '../../app';
import AccountModel from '../../database/models/AccountModel';
import {
  findAccountFalse,
  findOneAccount,
  postLogin,
  withoutEmail,
  withoutPassword,
} from './mocks/mockLogin';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    describe('Call without email', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/login').send(withoutEmail);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Email is a required field' });
      });
    });

    describe('Call without password', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/login').send(withoutPassword);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Password is a required field' });
      });
    });

    describe('Call with wrong email', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(null);

        const response = await chai.request(app).post('/login').send(postLogin);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
    });

    describe('Call with wrong password', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(findOneAccount as AccountModel);
        sinon.stub(bcrypt, 'compareSync').returns(false);

        const response = await chai.request(app).post('/login').send(postLogin);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
    });

    describe('Call account with status false', () => {
      it('Should return 401 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(findAccountFalse as AccountModel);
        sinon.stub(bcrypt, 'compareSync').returns(true);

        const response = await chai.request(app).post('/login').send(postLogin);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
    });

    describe('Succesfully logs in', () => {
      it('Should return 200 and a token', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(findOneAccount as AccountModel);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        sinon.stub(jwt, 'sign').callsFake(() => 'abc');

        const response = await chai.request(app).post('/login').send(postLogin);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ token: 'abc' });
      });
    });
  });
});
