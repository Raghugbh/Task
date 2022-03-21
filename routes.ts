import * as express from 'express';

 import BaseCtrl from './controllers/base';
// import TripdatasCtrl from './controllers/authcontroller';

function setRoutes(app): void {
  const router = express.Router();
   const baseCtrl = new BaseCtrl();
  // const tripdatasCtrl = new TripdatasCtrl();
  // Vehicles
  
  router.route('/employeedata').post(baseCtrl.insert);  
  router.route('/login').post(baseCtrl.login);  
  router.route('/delete').post(baseCtrl.delete); 
 // Trips
 //router.route('/driver/tripsdata/:id').get(tripdatasCtrl.getTripsByDriver);

  app.use('/api', router);
}
export default setRoutes;
