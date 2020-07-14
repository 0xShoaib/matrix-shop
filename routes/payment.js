const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "inr",
    description: `Purchase of Products`,
    shipping: {
      name: req.body.token.card.name,
      address: {
        line1: req.body.token.card.address_line1,
        city: req.body.token.card.address_city,
        country: req.body.token.card.address_country,
      },
    },
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

module.exports = router;
