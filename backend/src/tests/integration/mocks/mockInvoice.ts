const jwtValid = {
  id: 1,
  name: 'Fred',
  email: 'test@test.com',
};

const findAllAccountId = [{
  dataValues: [{
    id: 1,
    accountId: 1,
    expenseId: 1,
    value: 0,
    description: 'Comida',
    date: '2023-03-09',
  },
  {
    id: 3,
    accountId: 1,
    expenseId: 2,
    value: 10,
    description: 'Luz',
    date: '2023-04-19',
  }],
}];

const oneInvoice = {
  dataValues: {
    id: 1,
    accountId: 1,
    expenseId: 1,
    value: 0,
    description: 'Comida',
    date: '2023-03-09',
  },
};

const postInvoice = {
  expenseId: 1,
  value: 10,
  date: '2023-10-25',
};

const withoutExpenseId = {
  value: 10,
  date: '2023-10-25',
};

const withoutValue = {
  expenseId: 1,
  date: '2023-10-25',
};

const withoutDate = {
  expenseId: 1,
  value: 10,
};

const invalidDate = {
  expenseId: 1,
  value: 10,
  date: '2023-70-25',
};

const patchInvoice = {
  id: 1,
  invoiceInfo: {},
};

const withoutId = {
  invoiceInfo: {},
};

const withoutInvoiceInfo = {
  id: 1,
};

const deleteInvoice = {
  id: 1,
};

export {
  jwtValid,
  findAllAccountId,
  postInvoice,
  withoutDate,
  withoutExpenseId,
  withoutValue,
  invalidDate,
  oneInvoice,
  patchInvoice,
  withoutId,
  withoutInvoiceInfo,
  deleteInvoice,
};
