const express = require("express");
const router = express.Router();

const User = require("../../models/user/user");
const Product = require("../../models/products/product");
const Order = require("../../models/orders/order");



router.get("/", async (req,res)=>{

    try{

        const users = await User.countDocuments();

        const products = await Product.countDocuments();

        const orders = await Order.countDocuments();


        const revenueData = await Order.aggregate([
            {
                $match:{
                    status:"Delivered"
                }
            },
            {
                $group:{
                    _id:null,
                    total:{
                        $sum:"$totalAmount"
                    }
                }
            }
        ]);



        const revenue =
            revenueData.length > 0
            ? revenueData[0].total
            : 0;



        res.json({

            users,
            products,
            orders,
            revenue

        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;