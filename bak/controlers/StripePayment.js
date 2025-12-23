const Stripe=require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


module.exports.stripePayment=async(req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,           // amount in cents
      currency: "usd",
      automatic_payment_methods: { enabled: true }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  
};