import chai = require('chai');
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import jwt = require('jsonwebtoken');
import app from '../../app';
import InvoiceModel from '../../database/models/InvoiceModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Invoice Router', () => {
  beforeEach(() => {
    sinon.restore();
  });
});
