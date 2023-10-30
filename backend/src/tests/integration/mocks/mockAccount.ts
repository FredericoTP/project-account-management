const findAllAccounts = [{
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

const findOneAccount = {
  dataValues: [{
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: true,
  }],
};

const postParams = {
  name: 'Fred',
  email: 'test@test.com',
  password: '12345678',
};

const withoutName = {
  email: postParams.email,
  password: postParams.password,
};

const withoutEmail = {
  name: postParams.name,
  password: postParams.password,
};

const withoutPassword = {
  name: postParams.name,
  email: postParams.email,
};

const invalidEmail = {
  name: postParams.name,
  email: 'invalidEmail',
  password: postParams.password,
};

const invalidPassword = {
  name: postParams.name,
  email: postParams.email,
  password: '1234567',
};

const jwtValid = {
  id: 1,
  name: 'Fred',
  email: 'test@test.com',
};

export {
  findAllAccounts,
  findOneAccount,
  postParams,
  withoutName,
  withoutEmail,
  withoutPassword,
  invalidEmail,
  invalidPassword,
  jwtValid,
};
