import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const root = document.getElementById("root");

createRoot(root).render(
  <BrowserRouter>
   <Elements stripe={stripePromise}>
  <App/>
  </Elements>
  </BrowserRouter>
);
