import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import image_1 from '/Images_Used/ANARC_Watch.webp'
import image_2 from '/Images_Used/ANARC_Watch_2.webp'
import image_3 from '/Images_Used/ANARC_Watch_3.webp'
import image_4 from '/Images_Used/ANARC_Watch_4.webp'

import image_5 from '/Images_Used/image_1.png'
import image_6 from '/Images_Used/image_2.png'
import image_7 from '/Images_Used/image_3.png'

import image_8 from '/Images_Used/left-arrow.png'
import image_9 from '/Images_Used/right-arrow.png'

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
    image_1,
    image_2,
    image_3,
    image_4
  ];

  return (
    <>
    <div className='contact'>
        <a href="https://samp231004.github.io/Portfolio/" target='_blank'><img src={image_5} alt="" /></a>
        <a href="https://www.linkedin.com/in/samp2310/" target='_blank'><img src={image_6} alt="" /></a>
        <a href="https://github.com/SamP231004" target='_blank'><img src={image_7} alt="" /></a>
    </div>
    <div className="container">
      <h1>ANARC Smartwatch</h1>

      <div className="image_buttons">
        <img 
          onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)} 
          src={image_8}
          alt="Previous Image"
        />
        <img 
          onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)} 
          src={image_9}
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
