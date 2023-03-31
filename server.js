const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => console.log("Server Running in Port " + PORT));
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

const jereMail = "oyhamburo.jeremias@gmail.com"

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: jereMail,
    pass: "mwmqkpojuczeocdk"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.get("/test", (req, res) => {
  console.log('testeo')
  res.status(200).send('Ruta Send Test');
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: jereMail,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  console.log(mail)
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});