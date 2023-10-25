const allExpenses = [{
  dataValues: [{
    id: 1,
    expense: 'Alimentação',
  },
  {
    id: 2,
    expense: 'Energia',
  }],
}];

const oneExpense = {
  dataValues: [{
    id: 1,
    expense: 'Alimentação',
  }],
};

const createParamExpense = {
  expense: 'Alimentação',
};

const returnCreate = {
  dataValues: {
    id: 1,
    expense: 'Alimentação',
  },
};

const updateParamExpense = {
  oldExpense: 'Alimentação',
  newExpense: 'Energia',
};

export {
  allExpenses, oneExpense, createParamExpense, returnCreate, updateParamExpense,
};
