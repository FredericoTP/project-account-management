import express, { Request, Response, NextFunction } from 'express';
import {
  BadRequest, Conflict, NotFound, Unauthorized,
} from './errors';
import {
  accountRouter, loginRouter, expenseRouter, invoiceRouter,
} from './routers';

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/health', (_req, res) => res.status(200).send('Server on and healthy!'));

app.use('/account', accountRouter);

app.use('/login', loginRouter);

app.use('/expense', expenseRouter);

app.use('/invoice', invoiceRouter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Conflict) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFound) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Unauthorized) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'internal server error' });
});

export default app;
