
// temp schema it may delete further


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true
  },

  bookingDate: {
    type: Date,
    default: Date.now
  },

  isCancelled: {
    type: Boolean,
    default: false
  },

  cancelledAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
