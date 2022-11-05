const express=require("express");
const { getAllProducts, createProduct, updateProducts, deleteProduct, getSingleProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router=express.Router();

// route to get all products : https://localhost:4000/api/v1/products
router.route("/products").get(getAllProducts);

// route to get single product : https://localhost:4000/api/v1/product/id
router.route("/product/:id").get(getSingleProduct)

// route to create products : https://localhost:4000/api/v1/product/new
router.route("/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

// route to update a product : https://localhost:4000/api/v1/product/id
router.route("/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"), updateProducts);

// route to delete a product : https://localhost:4000/api/v1/product/id
router.route("/product/:id").delete(isAuthenticatedUser,authorizedRoles("admin"), deleteProduct);

module.exports=router