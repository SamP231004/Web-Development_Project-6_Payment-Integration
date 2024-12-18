import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_KEY);

function App() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("https://payment-integration-backend-gj7d.onrender.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          name: "ANARC SmartWatch",
          price: 6999,
        },
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error redirecting to Checkout:", result.error.message);
    }
  };

  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    './Images_Used/ANARC_Watch.webp',
    './Images_Used/ANARC_Watch_2.webp',
    './Images_Used/ANARC_Watch_3.webp',
    './Images_Used/ANARC_Watch_4.webp',
  ];

  return (
    <>
    <div className='contact'>
        <a href="https://samp231004.github.io/Portfolio/" target='_blank'><img src="./Images_Used/image_1.png" alt="" /></a>
        <a href="https://www.linkedin.com/in/samp2310/" target='_blank'><img src="./Images_Used/image_2.png" alt="" /></a>
        <a href="https://github.com/SamP231004" target='_blank'><img src="./Images_Used/image_3.png" alt="" /></a>
    </div>
    <div className="container">
      <h1>ANARC Smartwatch</h1>

      <div className="image_buttons">
        <img 
          onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)} 
          src="./Images_Used/left-arrow.png" 
          alt="Previous Image"
        />
        <img 
          onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)} 
          src="./Images_Used/right-arrow.png" 
          alt="Next Image"
        />
      </div>

      <div className="watch_img">
        <img src={images[currentImage]} alt="Watch" />
      </div>

      <button onClick={handleCheckout} className="btn">
        Buy Now
      </button>
    </div>
    </>
  );
}

export default App;
