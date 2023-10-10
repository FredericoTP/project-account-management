import { ModelStatic } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { NotFound } from '../errors';

class AccountService {
  private accountModel: ModelStatic<AccountModel>;

  constructor() {
    this.accountModel = AccountModel;
  }

  public async findAll(): Promise<AccountModel[]> {
    const accounts = await this.accountModel.findAll();

    return accounts;
  }

  public async findByEmail(email: string): Promise<AccountModel> {
    const account = await this.accountModel.findOne({
      where: { email },
    });

    if (!account) throw new NotFound('Account does not exists');

    return account;
  }
}

export default AccountService;
