
const { number } = require("joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    },
    amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Booking', bookingSchema);