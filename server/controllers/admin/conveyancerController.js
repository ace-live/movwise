const pool = require('../../config/db');

// Get all conveyancers with optional filters
exports.getConveyancers = async (req, res) => {
  try {
    let { is_verified, name, email, filter, page, limit } = req.query;
    let query = 'SELECT name,email,phone,status,status_desc FROM conveyancers WHERE 1=1';
    let queryParams = [];

    // Build dynamic WHERE conditions safely
    if (is_verified !== undefined) {
      queryParams.push(is_verified === 'true');
      query += ` AND is_verified = $${queryParams.length}`;
    }

    if (name) {
      queryParams.push(`%${name.toLowerCase()}%`);
      query += ` AND LOWER(name) LIKE $${queryParams.length}`;
    }

    if (email) {
      queryParams.push(`%${email.toLowerCase()}%`);
      query += ` AND LOWER(email) LIKE $${queryParams.length}`;
    }

    // Handle pagination
    page = parseInt(page);
    limit = parseInt(limit);
    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    const offset = (page - 1) * limit;

    let result, countResult;
    let totalRecords, totalPages;
    if (!filter || filter.trim() === '') {
      countResult = await pool.query('SELECT COUNT(*) FROM conveyancers');
      // No filter applied, just pagination
      query += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
      queryParams.push(limit, offset);
      result = await pool.query(query, queryParams);

    } else {
      countResult = await pool.query(
        'SELECT COUNT(*) FROM conveyancers WHERE LOWER(name) LIKE $1 OR LOWER(email) LIKE $1',
        [`%${filter.toLowerCase()}%`]
      );
      // Filter applied
      query += ` AND (LOWER(name) LIKE $${queryParams.length + 1} OR LOWER(email) LIKE $${queryParams.length + 1})`;
      queryParams.push(`%${filter.toLowerCase()}%`);
      query += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
      queryParams.push(limit, offset);
      result = await pool.query(query, queryParams);
    }
    totalRecords = parseInt(countResult.rows[0].count);
    totalPages = Math.ceil(totalRecords / limit);
    return res.status(200).json({
      page,
      limit,
      offset,
      totalRecords,
      totalPages,
      filter: filter || null,
      conveyancer: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific conveyancer by ID
exports.getConveyancerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM conveyancers WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conveyancer not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a conveyancer profile
exports.approveConveyancer = async (req, res) => {
  const { id } = req.params;
  const adminId = req.adminId || 1; // Replace with your auth middleware in production

  try {
    const result = await pool.query(
      `UPDATE conveyancers
       SET is_verified = TRUE,
           verified_by = $1,
           verified_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [adminId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conveyancer not found' });
    }

    res.status(200).json({
      message: 'Conveyancer profile approved successfully.',
      conveyancer: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete a conveyancer profile (mark as not verified)
exports.softDeleteConveyancer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE conveyancers
       SET is_verified = FALSE,
           verified_by = NULL,
           verified_at = NULL
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conveyancer not found' });
    }

    res.status(200).json({ message: 'Conveyancer marked as not verified.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.alterConveyancerStatus = async (req, res) => {
  const { id } = req.params;
  const { status, status_desc } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE users SET status = $1, status_desc = $2 WHERE user_id = $3 RETURNING user_id, status, status_desc',
      [status, status_desc, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: `User status updated to ${status ? 'active' : 'inactive'}`,
      user: result.rows[0] 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
