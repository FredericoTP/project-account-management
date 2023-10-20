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

interface INewInvoiceReq {
  infoToken: {
    id: number,
  };
  expenseId: number;
  value: number;
  description?: string;
  date: string;
}

interface IUpInvoiceReq {
  id: number;
  invoiceInfo: IUpdateInvoice;
}

export {
  INewInvoice, IUpdateInvoice, IUpInvoiceReq, INewInvoiceReq,
};
