const emptyLogin = {
  email: '',
  password: '',
};

const infoLogin = {
  email: 'test@test.com',
  password: '12345678',
};

const infoAccount = {
  dataValues: {
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: true,
  },
};

const falseAccount = {
  dataValues: {
    id: 1,
    name: 'Kurosaki Ichigo',
    email: 'ichigo@email.com',
    password: '12345678',
    status: false,
  },
};

export {
  emptyLogin, infoLogin, infoAccount, falseAccount,
};
