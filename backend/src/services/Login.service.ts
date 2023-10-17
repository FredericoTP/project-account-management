import bcrypt = require('bcryptjs');
import { ModelStatic } from 'sequelize';
import AccountModel from '../database/models/AccountModel';
import JwtToken from '../authentication/auth';
import { ILogin } from '../interfaces';
import { Unauthorized } from '../errors';
import { validateLogin } from './validations/validationInputValues';

class LoginService {
  private accountModel: ModelStatic<AccountModel>;

  constructor(private auth: JwtToken) {
    this.accountModel = AccountModel;
  }

  public async login(accountInfo: ILogin): Promise<string> {
    const { email, password } = accountInfo;

    validateLogin(accountInfo);

    const account = await this.accountModel.findOne({
      where: { email },
    });

    if (!account) throw new Unauthorized('Invalid email or password');

    const isValidPassword = bcrypt.compareSync(password, account.password);

    if (!isValidPassword) throw new Unauthorized('Invalid email or password');

    if (!account.dataValues.status) throw new Unauthorized('Invalid email or password');

    const token = this.auth.generateToken({
      id: account.id,
      name: account.name,
      email: account.email,
    });

    return token;
  }
}

export default LoginService;
