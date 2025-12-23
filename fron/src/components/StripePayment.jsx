import { useState } from "react";
import {  toast } from 'react-toastify';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./StripePayment.css";

export default function StripePayment({ amount, setBookingStatus, open, onClose }) {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePayment = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/create-payment-intent`,
      { amount },
      { withCredentials: true }
    );

    
    const clientSecret = res.data.clientSecret;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment Successful!");
      setBookingStatus('confirmed')
      onClose();
    }

  } catch (err) {
    console.error(err);
    toast.error("Payment failed");
  }

  setLoading(false);
};


  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Payment</h2>

        <form onSubmit={handlePayment}>
          <div className="card-box">
            <CardElement />
          </div>

          <button className="pay-btn" disabled={loading} style={{width:'100%'}}>
            {loading ? "Processing..." : `Pay ₹${amount / 100}`}
          </button>
        </form>

        <button className="close-btn" onClick={onClose}>close</button>
      </div>
    </div>
  );
}
