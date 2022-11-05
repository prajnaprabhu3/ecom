const mongoose=require("mongoose");
const Schema=mongoose.Schema
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

// required for generating token 
const crypto=require("crypto");

const userSchema = new Schema({
   name:{
    type:String,
    required:[true, "Please enter your name"],
    maxLength:[40,"Name cannout exceed 40 characters"],
    minLength:[4,"Name should have more than 4 characters"],
   },
   email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:true,
    // validator:[validator.isEmail,"Please enter a valid email"]
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
   },
   password:{
    type:String,
    required:[true,"Please enter your password"],
    minLength:[8,"Password should be more than 8 characters"],
    select:false,
   },
   avatar:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    role:{
        type:String,
        default:"user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

// to convert password to hash 
userSchema.pre("save",async function(next){

  if(!this.isModified("password")){
    next();
  }

  this.password=await bcrypt.hash(this.password,10)
})

// JWT Token 
userSchema.methods.getJWTToken = function (){
  return jwt.sign({id:this._id }, process.env.JWT_SECRET, {
      expiresIn:process.env.JWT_EXPIRE,
  });
};

// compare password
userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}


// Generating Password Reset Token 
userSchema.methods.getResetPasswordToken=function(){

  // Generating token 
  const resetToken= crypto.randomBytes(20).toString("hex");

  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
  //  for token to expire - we'll keep it 15min
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;

};

module.exports=mongoose.model("User", userSchema);
