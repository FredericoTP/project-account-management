import { Request, Response } from 'express';
import AccountService from '../services/Account.service';
import { IAccount, IUpAccName, IUpAccPassword } from '../interfaces';

class AccountController {
  constructor(private accountService = new AccountService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const accounts = await this.accountService.findAll();

    return res.status(200).json(accounts);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const accountInfo: IAccount = req.body;

    const account = await this.accountService.create(accountInfo);

    return res.status(201).json(account);
  }

  public async updateName(req: Request, res: Response): Promise<Response> {
    const info: IUpAccName = req.body;

    await this.accountService.updateName(info.name, info.infoToken.email);

    return res.status(200).json({ message: 'Account has been updated' });
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const info: IUpAccPassword = req.body;

    await this.accountService.updatePassword(info.password, info.infoToken.email);

    return res.status(200).json({ message: 'Password has been updated' });
  }

  public async delete(req: Request, res:Response): Promise<Response> {
    const { infoToken } = req.body;

    await this.accountService.delete(infoToken.email);

    return res.status(200).json({ message: 'Account has been deleted' });
  }
}

export default AccountController;
