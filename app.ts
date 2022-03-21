import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import setMongo from './mongo';
import setRoutes from './routes';

dotenv.config();
const app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(function (req, res, next) {
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

async function main(): Promise<any> {
  try {
    await setMongo();
    setRoutes(app);
    app.listen(app.get('port'), () => console.log(`App is listening on port ${app.get('port')}`));
    console.log('Testing');
  } catch (err) {
    console.error(err);
  }
}

main();
export { app };
