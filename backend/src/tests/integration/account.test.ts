import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import app from '../../app';
import AccountModel from '../../database/models/AccountModel';
import {
  findAllAccounts,
  withoutName,
  withoutEmail,
  withoutPassword,
  invalidEmail,
  invalidPassword,
  findOneAccount,
  postParams,
  jwtValid,
} from './mocks/mockAccount';

chai.use(chaiHttp);

const { expect } = chai;

describe('Account Router', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /account', () => {
    describe('Succesfully returns all accounts', () => {
      it('Should return 200 and accounts', async () => {
        sinon.stub(AccountModel, 'findAll').resolves(findAllAccounts as AccountModel[]);

        const response = await chai.request(app).get('/account');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(findAllAccounts);
      });
    });
  });

  describe('POST /account', () => {
    describe('Call without name', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withoutName);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'name is a required field' });
      });
    });

    describe('Call without email', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withoutEmail);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'email is a required field' });
      });
    });

    describe('Call without password', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(withoutPassword);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'password is a required field' });
      });
    });

    describe('Call with invalid email', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(invalidEmail);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'email should be valid' });
      });
    });

    describe('Call with a password of less than 8 characters', () => {
      it('Should return 400 and a message', async () => {
        const response = await chai.request(app).post('/account').send(invalidPassword);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'password should have a minimum length of 8' });
      });
    });

    describe('Call with email that is already registered', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(findOneAccount as AccountModel);

        const response = await chai.request(app).post('/account').send(postParams);

        expect(response.status).to.be.equal(409);
        expect(response.body).to.be.deep.equal({ message: 'Account already exists' });
      });
    });

    describe('Succesfully creates an account', () => {
      it('Should return 201 and account', async () => {
        sinon.stub(AccountModel, 'findOne').resolves(null);
        sinon.stub(AccountModel, 'create').resolves(findOneAccount as AccountModel);

        const response = await chai.request(app).post('/account').send(postParams);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(findOneAccount);
      });
    });
  });

  describe('PATCH /account/name', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/account/name');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a messgae', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/account/name').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without name', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/account/name')
          .set('Authorization', 'valid-token');

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Name is a required field' });
      });
    });

    describe('Succesfully updates an account name', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'update').resolves();

        const response = await chai.request(app).patch('/account/name')
          .set('Authorization', 'valid-token')
          .send({ name: postParams.name });

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Account has been updated' });
      });
    });
  });

  describe('PATCH /account/password', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).patch('/account/password');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a messgae', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).patch('/account/password').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Call without password', () => {
      it('Should return 400 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);

        const response = await chai.request(app).patch('/account/password')
          .set('Authorization', 'valid-token');

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: 'Password is a required field' });
      });
    });

    describe('Succesfully updates an account password', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'update').resolves();

        const response = await chai.request(app).patch('/account/password')
          .set('Authorization', 'valid-token')
          .send({ password: postParams.password });

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Password has been updated' });
      });
    });
  });

  describe('DELETE /account', () => {
    describe('Call without token', () => {
      it('Should return 401 and a message', async () => {
        const response = await chai.request(app).delete('/account');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Call with invalid token', () => {
      it('Should return 401 and a messgae', async () => {
        sinon.stub(jwt, 'verify').throws(new Error());

        const response = await chai.request(app).delete('/account').set('Authorization', 'invalid-token');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'Token must be valid' });
      });
    });

    describe('Succesfully deletes an account', () => {
      it('Should return 200 and a message', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => jwtValid);
        sinon.stub(AccountModel, 'update').resolves();

        const response = await chai.request(app).delete('/account')
          .set('Authorization', 'valid-token');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: 'Account has been deleted' });
      });
    });
  });
});
