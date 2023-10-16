import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { AccountController } from '../controllers';
import { validateToken, validateUpdateName, validateUpdatePassword } from '../middlewares';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.get('/', (req: Request, res: Response) => accountController.findAll(req, res));

accountRouter.post('/', (req: Request, res:Response) => accountController.create(req, res));

accountRouter.patch('/name', validateToken, validateUpdateName, (req: Request, res:Response) => accountController.updateName(req, res));

accountRouter.patch('/password', validateToken, validateUpdatePassword, (req: Request, res:Response) => accountController.updatePassword(req, res));

accountRouter.delete('/delete', validateToken, (req: Request, res:Response) => accountController.delete(req, res));

export default accountRouter;
