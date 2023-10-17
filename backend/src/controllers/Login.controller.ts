import { Request, Response } from 'express';
import LoginService from '../services/Login.service';
import JwtToken from '../authentication/auth';
import { ILogin } from '../interfaces';

class LoginController {
  private loginService: LoginService;

  constructor(private auth: JwtToken) {
    this.loginService = new LoginService(this.auth);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const loginInfo: ILogin = req.body;

    const token = await this.loginService.login(loginInfo);

    return res.status(200).json({ token });
  }
}

export default LoginController;
