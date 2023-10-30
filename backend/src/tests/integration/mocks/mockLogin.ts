const postLogin = {
  email: 'test@test.com',
  password: '12345678',
};

const withoutEmail = {
  password: postLogin.password,
};

const withoutPassword = {
  email: postLogin.email,
};

const findOneAccount = {
  dataValues: {
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: true,
  },
};

const findAccountFalse = {
  dataValues: [{
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: false,
  }],
};

export {
  postLogin, withoutEmail, withoutPassword, findOneAccount, findAccountFalse,
};
