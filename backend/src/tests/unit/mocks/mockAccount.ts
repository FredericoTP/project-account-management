const allAccounts = [{
  dataValues: [{
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: true,
  },
  {
    id: 2,
    name: 'Naruto Uzumaki',
    email: 'naruto@email.com',
    password: '87654321',
    status: true,
  }],
}];

const oneAccount = {
  dataValues: [{
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: true,
  }],
};

const emptyParam = { name: '', email: 'test@test.com', password: '12345678' };

const accountParams = { name: 'Uchiha Sasuke', email: 'sasuke@email.com', password: '12345678' };

const returnCreate = {
  dataValues: {
    ...accountParams,
    status: 1,
  },
};

const reqParam = {
  name: 'Fred',
  password: '12345678',
  infoToken: {
    id: 2,
    name: 'Krainz',
    email: 'test@test.com',
  },
};

export {
  allAccounts, emptyParam, oneAccount, accountParams, returnCreate, reqParam,
};
