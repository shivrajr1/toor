
const ExpressError = require("../utils/ExpressError");
const Booking=require('../models/booking')


module.exports.getBooking=async(req,res)=>{}

module.exports.Add = async (req, res) => {
    let {listId}=req.params
    let {amount}=req.body
    if(!amount || amount<0){
        return res.status(400).send('enter valid amount')
    }
    let userId=req.user._id
    const exists = await Booking.exists({ user: userId, list: listId });
    if (exists) {
    return res.status(200).json({ message: "Already booked" });
    }

    let newBooking=new Booking({
        user:userId,
        list:listId,
        amount:amount
    })
    await newBooking.save()
    res.status(200).json({ message: "Success" });
}

module.exports.Delete = async (req, res) => {}
