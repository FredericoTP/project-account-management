interface INewInvoice {
  accountId: number;
  expenseId: number;
  value: number;
  description?: string;
  date: string;
}

interface IUpdateInvoice {
  expenseId?: number;
  value?: number;
  description?: string;
  date?: string;
}

export { INewInvoice, IUpdateInvoice };
