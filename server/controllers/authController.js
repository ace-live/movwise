const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name,email, phone, password, status, status_desc,is_buyer,is_seller,is_remortgage, is_guest, is_otp_verified, is_subscribed } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password,status,status_desc,is_buyer,is_seller,is_remortgage, is_guest, is_otp_verified, is_subscribed) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING user_id, email,name',
      [name,email, phone,hashed, status,status_desc,is_buyer,is_seller,is_remortgage, is_guest, is_otp_verified, is_subscribed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (!user) return res.status(400).json({ error: 'User not found' });
        
      if (user.role !== 1) return res.status(403).json({ error: 'Access denied' });
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: 'Invalid password' });
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


exports.updateUserStatus = async (req, res) => {
  const { id,status, status_desc } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET status=$2,status_desc=$3 WHERE user_id = $1 RETURNING user_id, status, status_desc',
      [id, status, status_desc]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.verifyOtpStatus = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM otp_store WHERE user_email = $1 AND otp_value = $2 AND status = $3',
      [email, otp, false]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    
    // Update the OTP status to verified
    await pool.query(
      'UPDATE otp_store SET status = $3 WHERE user_email = $1 AND otp_value = $2',
      [email, otp, true]
    );
    
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

