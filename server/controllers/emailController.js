const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const pool = require('../config/db');

const app = express();
app.use(bodyParser.json());

// SMTP transporter setup (example: Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// User registration route
exports.sendemail =  async (req, res) => {
  const { name, email } = req.body;

  // You would save the user to the database here

  // Email options
  const mailOptions = {
    from: 'sundhar06@gmail.com',
    to: email,
    subject: 'Registration Successful',
    html: `<h3>Hello ${name},</h3><p>Kindly Check the OTP</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Function successful, but failed to send email' , error: error.message });
  }
};

//Email to send OTP
exports.sendotpemail =  async (req, res) => {
  const random4Digit = Math.floor(1000 + Math.random() * 9000);
  const { name, email, purpose } = req.body;
 
  // Email options
  const mailOptions = {
    from: 'sundhar06@gmail.com',
    to: email,
    subject: 'Registration Successful',
    html: `<h3>Hello ${name},</h3><p>Kindly Check the OTP ${random4Digit}</p>`
  };

  try {
   const query = `
  INSERT INTO otp_store (user_email, otp_value, status, purpose)
  VALUES ($1, $2, $3, $4)
  RETURNING user_email, status
`;

const values = [email, random4Digit, false, purpose];

await pool.query(query, values);
  await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Function successful, but failed to send email' , error: error.message });
  }
};