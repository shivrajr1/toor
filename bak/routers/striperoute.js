const express=require('express')
const router=express.Router();
const wrapasync=require('../utils/wrapasync')
const {stripePayment}=require('../controlers/StripePayment')


router.route("/").post(wrapasync(stripePayment))


module.exports=router;