const findAllExpenses = [{
  dataValues: [{
    id: 1,
    expense: 'Alimentação',
  },
  {
    id: 2,
    expense: 'Energia',
  }],
}];

const findOneExpense = {
  dataValues: {
    id: 1,
    expense: 'Alimentação',
  },
};

const jwtValid = {
  id: 1,
  name: 'Fred',
  email: 'test@test.com',
};

const newExpense = {
  expense: 'Alimentação',
};

const updateExpense = {
  oldExpense: 'Alimentação',
  newExpense: 'Energia',
};

const withoutOld = {
  newExpense: 'Energia',
};

const withoutNew = {
  oldExpense: 'Alimentação',
};

export {
  findAllExpenses, jwtValid, findOneExpense, newExpense, updateExpense, withoutNew, withoutOld,
};
