require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const PORT = process.env.PORT || 3030;

//Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Email API
app.post("/api/email/contactForm", (req, res) => {
  console.log(req.body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "upe@bu.edu",
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
  };

  async () => {
    try {
      await sgMail.send(msg);
    } catch (err) {
      console.error(err.toString());
    }
  };
});


//Listing
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
