import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { LoginController } from '../controllers';
import JwtToken from '../authentication/auth';
import { validateLogin } from '../middlewares';

const loginRouter = Router();
const auth = new JwtToken();
const loginController = new LoginController(auth);

loginRouter.post('/', validateLogin, (req: Request, res: Response) => loginController.login(req, res));

export default loginRouter;
