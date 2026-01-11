
const ExpressError = require("../utils/ExpressError");
const Booking=require('../models/booking')


module.exports.getBooking=async(req,res)=>{}

module.exports.Add = async (req, res) => {
    let {listId}=req.params
    let userId=req.user._id
    const exists = await Booking.exists({ user: userId, list: listId });
    if (exists) {
    return res.status(400).json({ message: "Already booked" });
    }

    let newBooking=new Booking({
        user:userId,
        list:listId
    })
    await newBooking.save()
    res.send('success')
}

module.exports.Delete = async (req, res) => {}
