import express from 'express';
import cors from 'cors';
import router from './routers';
import { config } from 'dotenv';
config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
  }),
);
app.use(express.json());
app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use((req, res, next) => {
  res.status(404).send('Not found');
});
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log('err: ', err);
    res.status(500).send(err.message);
  },
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
