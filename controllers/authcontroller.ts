// import { NextFunction, Request, Response } from 'express'
// import * as jwt from 'jsonwebtoken';
// import User from '../models/company';

// var AWS = require("aws-sdk");

// export class AuthController {
//   model = User;

//   public authenticateJWT(req: Request, res: Response, next: NextFunction) {
//     jwt.verify(req.headers.token, "accesstoken", (error, decoded) => {
//       if (decoded?.user?.email) {
//         User.findOne({
//           email: decoded?.user?.email
//         }, (err, user) => {
//           if (user == null) {
//             return res.status(401).json({ status: 'error', code: 'User does not exist' })
//           }
//           else {
//             if (error) {
//               return res.status(401).json({ status: 'error', code: 'unauthorized' })
//             }
//             else {
//               return next()
//             }
//           }
//         })
//       } else {
//         return res.status(401).json({ status: 'error', code: 'unauthorized' })
//       }

//     });
//   }

//   public refreshJWT(req: Request, res: Response, next: NextFunction) {
//     jwt.verify(req.headers.token, "refreshtoken", (error, decoded) => {
//       if (decoded?.user?.email) {
//         User.findOne({
//           email: decoded?.user?.email
//         }, (err, user) => {
//           if (user == null) {
//             return res.status(401).json({ status: 'error', code: 'User does not exist' })
//           }
//           else {
//             if (error) {
//               return res.status(401).json({ status: 'error', code: 'unauthorized' })
//             }
//             else {
//               let idtoken = jwt.sign(decoded, "accesstoken", {
//                 expiresIn: "2h",
//               });
//               return res.status(200).json({ idtoken, photourl: getimageurl(user._id) });
//             }
//           }
//         })
//       } else {
//         return res.status(401).json({ status: 'error', code: 'User does not exist' })
//       }
//     });
//   }
// }

// export default AuthController;