const Product=require("../models/productModel");

// if-blocks error handler import 
const ErrorHandler = require("../utils/errorhandler");

// async catch error import 
const catchAsyncError=require("../middleware/catchAsyncError");

// search, filter and other features import form utils 
const ApiFeatures = require("../utils/apiFeatures");


// Create Product - admin only
exports.createProduct= catchAsyncError(async(req,res,next)=>{

    //to get the user id whose creating product
    req.body.user=req.user.id;

    const product=await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
});


// Get all products 
exports.getAllProducts=catchAsyncError(async (req,res, next)=>{

    // return next(new ErrorHandler("This is my trial error",500));

    const resultPerPage = 6;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products,
        productsCount,
    })
});

// get single product 
exports.getSingleProduct=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        sucess:true,
        product
    })
});



// update products - only admin
exports.updateProducts=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false});

    res.status(200).json({
        sucess:true,
        product
    })
});

//delete product
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove();

    res.status(200).json({
        sucess:true,
        message:"Product delete successfuly"
    })
});