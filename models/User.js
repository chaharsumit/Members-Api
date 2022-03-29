const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre("save", async function(next){
  if(this.password && this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.verifyPassword = async function(password){
  try{
    let result = await bcrypt.compare(password, this.password);
    return result;
  }catch(error){
    return error;
  }
}

userSchema.methods.signToken = async function(){
  let payload = { userId: this.id, email: this.email };
  try{
    let token = await jwt.sign(payload, "thisisasecretstring");
    return token;
  }catch(error){
    return error;
  }
}

userSchema.methods.userJSON = function(token){
  return {
    userId: this.id,
    email: this.email,
    bio: this.bio,
    image: this.image,
    username: this.username,
    token: token
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;