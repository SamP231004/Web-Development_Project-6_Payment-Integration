const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv"); // Add dotenv
const { v4: uuidv4 } = require("uuid");

// Configure dotenv
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debugging - Ensure the key is loaded
// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Samarth here");
});

app.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,

    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Listen
app.listen(8000, () => console.log("Listening at port 8000."));