const pool = require('../../config/db');
const bcrypt = require('bcryptjs');

// Get all users with pagination and optional filter
exports.getUsers = async (req, res) => {
  try {
    let { page, limit, filter } = req.body;

    page = parseInt(page);
    limit = parseInt(limit);
    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    const offset = (page - 1) * limit;

    let result;
    if (!filter || filter.trim() === '') {
      // No filter applied
      result = await pool.query(
        'SELECT * FROM users ORDER BY user_id LIMIT $1 OFFSET $2',
        [limit, offset]
      );
    } else {
      // Filter applied
      result = await pool.query(
        'SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 ORDER BY user_id LIMIT $2 OFFSET $3',
        [`%${filter}%`, limit, offset]
      );
    }
    return res.status(200).json({
      page,
      limit,
      offset,
      filter: filter || null,
      users: result.rows
    });
  } catch (err) {
    console.error('Error in getUsers:', err);
    res.status(500).json({ error: err.message });
  }
};


// Get a specific user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, phone, password, status, status_desc, is_buyer, is_seller, is_remortgage, is_guest, is_otp_verified, is_subscribed } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password, status, status_desc, is_buyer, is_seller, is_remortgage, is_guest, is_otp_verified, is_subscribed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING user_id, name, email, status',
      [name, email, phone, hashedPassword, status, status_desc, is_buyer, is_seller, is_remortgage, is_guest, is_otp_verified, is_subscribed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password, status, status_desc, is_buyer, is_seller, is_remortgage, is_guest, is_otp_verified, is_subscribed } = req.body;

  try {
    const existingUserResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (existingUserResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : existingUserResult.rows[0].password;

    const updateResult = await pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, password = $4, status = $5, status_desc = $6, is_buyer = $7, is_seller = $8, is_remortgage = $9, is_guest = $10, is_otp_verified = $11, is_subscribed = $12 WHERE user_id = $13 RETURNING user_id, name, email',
      [name, email, phone, hashedPassword, status, status_desc, is_buyer, is_seller, is_remortgage, is_guest, is_otp_verified, is_subscribed, id]
    );
    res.status(200).json(updateResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Alter user status (active/inactive)
exports.alterUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status, status_desc } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await pool.query('UPDATE users SET status = $1, status_desc = $2 WHERE user_id = $3 RETURNING user_id, status, status_desc', [status, status_desc, id]);
    res.status(200).json({ message: `User status updated to ${status ? 'active' : 'inactive'}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user roles (buyer, seller, remortgage, etc.)
exports.updateUserRoles = async (req, res) => {
  const { id } = req.params;
  const { is_buyer, is_seller, is_remortgage, is_guest } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await pool.query(
      'UPDATE users SET is_buyer = $1, is_seller = $2, is_remortgage = $3, is_guest = $4 WHERE user_id = $5 RETURNING user_id, is_buyer, is_seller, is_remortgage, is_guest',
      [is_buyer, is_seller, is_remortgage, is_guest, id]
    );
    res.status(200).json({ message: 'User roles updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};