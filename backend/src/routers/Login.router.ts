import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { LoginController } from '../controllers';
import LoginService from '../services/Login.service';
import JwtToken from '../authentication/auth';
import { validateLogin } from '../middlewares';

const loginRouter = Router();
const auth = new JwtToken();
const loginService = new LoginService(auth);
const loginController = new LoginController(loginService);

loginRouter.post('/', validateLogin, (req: Request, res: Response) => loginController.login(req, res));

export default loginRouter;
