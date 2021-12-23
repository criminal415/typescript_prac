import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3000);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('ozam-server 정상 동작!');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}`);
});
