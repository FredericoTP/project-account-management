const emptyInvoiceParam = {
  accountId: 1,
  expenseId: 1,
  value: 0,
  description: '',
  date: '',
};

const invalidDate = {
  accountId: 1,
  expenseId: 1,
  value: 0,
  description: 'Comida',
  date: 'abc',
};

const validInvoice = {
  accountId: 1,
  expenseId: 1,
  value: 0,
  description: 'Comida',
  date: '2023-12-12',
};

const createdInvoice = {
  dataValues: {
    id: 1,
    accountId: 1,
    expenseId: 1,
    value: 0,
    description: 'Comida',
    date: '2023-03-09',
  },
};

const accountIdInvoices = [{
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

const invalidParam = {
  description: '',
};

const validUpdate = {
  description: 'Comida',
};

const createInvoiceReqParam = {
  infoToken: {
    id: 1,
  },
  expenseId: 2,
  value: 10,
  date: '2023-09-21',
};

const updateInvoiceReqParam = {
  id: 1,
  invoiceInfo: {
    description: 'Comida',
  },
};

const deleteInvoiceReqParam = {
  id: 1,
};

export {
  emptyInvoiceParam,
  invalidDate,
  createdInvoice,
  validInvoice,
  accountIdInvoices,
  invalidParam,
  validUpdate,
  createInvoiceReqParam,
  updateInvoiceReqParam,
  deleteInvoiceReqParam,
};
