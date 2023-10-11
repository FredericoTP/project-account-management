import { ModelStatic } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import { NotFound, Conflict } from '../errors';
import { IAccount } from '../interfaces';
import { validateNewAccount, validateEmail } from './validations/validationInputValues';

class AccountService {
  private accountModel: ModelStatic<AccountModel>;

  constructor() {
    this.accountModel = AccountModel;
  }

  public async findAll(): Promise<AccountModel[]> {
    const accounts = await this.accountModel.findAll();

    return accounts;
  }

  public async findByEmail(email: string): Promise<AccountModel | null> {
    const account = await this.accountModel.findOne({
      where: { email },
    });

    return account;
  }

  public async create(accountInfo: IAccount): Promise<AccountModel> {
    const { name, email, password } = accountInfo;

    validateNewAccount(accountInfo);

    const checkAccount = await this.findByEmail(email);

    if (checkAccount) throw new Conflict('Account already exists');

    const account = await this.accountModel.create({
      name, email, password,
    });

    return account;
  }

  public async delete(email: string): Promise<void> {
    validateEmail(email);

    await this.accountModel.update(
      { status: 0 },
      { where: { email } },
    );
  }
}

export default AccountService;
