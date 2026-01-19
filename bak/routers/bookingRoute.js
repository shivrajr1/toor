
const wrapAsync=require('../utils/wrapasync')
const express = require('express')
const router = express.Router();
const { islogin } = require('../middlewares/isLogin');
const {Add}=require('../controllers/booking')



router.route("/:listId").post(islogin, wrapAsync(Add))

module.exports = router;