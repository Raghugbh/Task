 import OfficeTeam from '../models/officeteam';
 var CryptoJS = require("crypto-js");
 import * as jwt from 'jsonwebtoken';
class BaseCtrl {
    
   model = OfficeTeam;
//   // Get all
//   getAll = async (req, res) => {
//     try {
//       const docs = await this.model.find({});
//       res.status(200).json(docs);
//     } catch (err) {
//       return res.status(400).json({ error: err.message });
//     }
//   }

//   // Count all
//   count = async (req, res) => {
//     try {
//       const count = await this.model.count();
//       res.status(200).json(count);
//     } catch (err) {
//       return res.status(400).json({ error: err.message });
//     }
//   }

  // Insert
  insert = async (req, res) => {
    try {
    var encodedPassword = CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString();
      let  customerCode;
      let basicSal;
      let doc =  await this.model.find({}).sort({_id:-1}).limit(1);

    if(doc[0]){customerCode = doc[0].customer_code+1;  }
    else{ customerCode = 1101;  }

    if(req.body.designation.toLowerCase()==="manager")
    {
       basicSal = 50000;
    }
    else if (req.body.designation.toLowerCase()==="employee")
    {
      basicSal = 25000;
    }
    else if(req.body.designation.toLowerCase()==="office assistant")
    {
       basicSal = 10000;
    }

      const obj = await new this.model(({...req.body, password:encodedPassword, customer_code:customerCode, basicsal: basicSal})).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }




  login = (req, res) => {
    
    {
      this.model.findOne(
        {
          customer_code: req.body.customer_code,
        },
        (err, user) => {
          var bytes  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
          var originalPwd = bytes.toString(CryptoJS.enc.Utf8);
          if (err) throw err;
          if (originalPwd!==req.body.password) {
            return res.status(401).json({ message: 'Authentication failed. No user found' });
          } else if (originalPwd===req.body.password) {

               {
                console.log('login user', user);
                let idtoken = jwt.sign({ user }, 'accesstoken', {
                  expiresIn: '2h',
                });
                let refreshtoken = jwt.sign({ user }, 'refreshtoken');
                return res.status(200).json({
                  idtoken,
                  refreshtoken,
                  expiresIn: '2h',
                });
              }
          }
        }
      );
    }
  };
//   // Get by id
//   get = async (req, res) => {
//     try {
//       const obj = await this.model.findOne({ _id: req.params.id });
//       res.status(200).json(obj);
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   }

//   // Update by id
//   update = async (req, res) => {
//     try {
//       await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
//       res.status(200).send({ message: "Updated successfully" });
//     } catch (err) {
//       return res.status(400).json({ error: err.message });
//     }
//   }

//   // Delete by id
  delete = async (req, res) => {
    try {
      await this.model.findOneAndRemove({ _id: req.body.customer_code });
      res.status(200).send({ message: "Delete successfully" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default BaseCtrl;
