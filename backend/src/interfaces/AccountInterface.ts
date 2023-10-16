interface IAccount {
  name: string;
  email: string;
  password: string;
}

interface IUpAccName {
  infoToken: {
    id: number,
    email: string,
  };
  name: string;
}

interface IUpAccPassword {
  infoToken: {
    id: number,
    email: string,
  };
  password: string;
}

export { IAccount, IUpAccName, IUpAccPassword };
