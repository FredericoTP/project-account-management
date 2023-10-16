import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { AccountController } from '../controllers';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.get('/', (req: Request, res: Response) => accountController.findAll(req, res));

accountRouter.post('/', (req: Request, res:Response) => accountController.create(req, res));

accountRouter.patch('/name', (req: Request, res:Response) => accountController.updateName(req, res));

accountRouter.patch('/password', (req: Request, res:Response) => accountController.updatePassword(req, res));

accountRouter.delete('/delete', (req: Request, res:Response) => accountController.delete(req, res));

export default accountRouter;
