
// if-blocks error handler import 
const ErrorHandler = require("../utils/errorhandler");

// async catch error import 
const catchAsyncError=require("../middleware/catchAsyncError");

const User=require("../models/userModel");

const sendToken=require("../utils/jwtToken");

// sendEmail function import for reset Password
const sendEmail=require("../utils/sendEmail");

//needed for reset password function
const crypto=require("crypto");

// Register a user 
exports.registerUser= catchAsyncError( async(req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email, 
        password,
        avatar:{
            public_id:"sample id",
            url:"this is trial",
        },
    });

   sendToken(user,200,res);
})


// Login user 
exports.loginUser= catchAsyncError ( async (req,res,next)=>{

    const {email,password}=req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }

    const user=await User.findOne({ email }).select("+password");

    // if username is wrong 
    if(!user){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    const isPasswordMatched= await user.comparePassword(password);

    // if password is wrong 
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
})


// Logout user 
exports.logoutUser=catchAsyncError(async(req,res,next)=>{

   res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });

});


// Forgot Password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    //Get ResetPassword Token
    const resetToken=  user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    // currently to test on frontend 
    const resetPasswordUrl=`${process.env.CONNECT_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is (localhost Only) \n\n ${resetPasswordUrl} \n \n If you have not requested this email then kindly ignore it `;

    try {
        await sendEmail({
            email:user.email,
            subject:`shopHere Password Recovery`,
            message,

        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} succesfully`,
        });
        
    } catch (error) {
       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined; 

       await user.save({ validateBeforeSave:false});

       return next(new ErrorHandler(error.message, 500));
    }
})


// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


// Get user details 
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{

  // getting the user via id 
  const user = await User.findById(req.user.id);
  console.log(req.user)

  res.status(200).json({
    success:true,
    user,
  });
});



// update user password 
exports.updatePassword = catchAsyncError(async(req,res,next)=>{

  // getting the user via id 
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

  // if password is wrong 
  if(!isPasswordMatched){
      return next(new ErrorHandler("Old password is incorrect",400));
  }

  if(req.body.newPassword !== req.body.confirmPassword ){
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password=req.body.newPassword;

  await user.save()

  sendToken(user,200,res);
});



// update user details 
exports.updateProfile = catchAsyncError(async(req,res,next)=>{

  const newUserDetails={
    name:req.body.name,
    email:req.body.email,
  };

  // We'll add cloudinary for avatar later on 

  const user= await User.findByIdAndUpdate(req.user.id,newUserDetails,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  

  res.status(200).json({
    success:true,
  });

});