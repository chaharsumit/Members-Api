const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    try{
      if(token){
        let payload = await jwt.verify(token, "thisisasecretstring");
        req.user = payload;
        return next();
      }else{
        return res.status(400).json({error: "Token Required"});
      }
    }catch(error){
      next(error);
    }
  },
  optionalVerify: async (req, res, next) => {
    let token = req.headers.authorization;
    try{
      if(token){
        let payload = await jwt.verify(token, "thisisasecretstring");
        let currUser = await User.findOne({ email: payload.email });
        next();
      }else{
        req.user = null;
        next();
      }
    }catch(error){
      next(error);
    }
  }
}