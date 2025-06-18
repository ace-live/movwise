const pool = require('../../config/db');

// Get all disputes
exports.getDisputes = async (req, res) => {
    try {
    let { status, requester_id, conveyancer_id, property_ref_id, page, limit, filter } = req.query;

    let baseQuery = `
    FROM disputes
    JOIN users ON disputes.requester_id = users.user_id
    JOIN conveyancers ON disputes.conveyancer_id = conveyancers.id
    WHERE 1=1
  `;

    const queryParams = [];

    // Apply filters
    if (status) {
      queryParams.push(status);
      baseQuery += ` AND disputes.status = $${queryParams.length}`;
    }
    if (requester_id) {
      queryParams.push(requester_id);
      baseQuery += ` AND disputes.requester_id = $${queryParams.length}`;
    }
    if (conveyancer_id) {
      queryParams.push(conveyancer_id);
      baseQuery += ` AND disputes.conveyancer_id = $${queryParams.length}`;
    }
    if (property_ref_id) {
      queryParams.push(property_ref_id);
      baseQuery += ` AND disputes.property_ref_id = $${queryParams.length}`;
    }

    // Apply filter (search)
    if (filter && filter.trim() !== '') {
      queryParams.push(`%${filter.toLowerCase()}%`);
      baseQuery += ` AND (LOWER(users.name) LIKE $${queryParams.length} OR LOWER(conveyancers.name) LIKE $${queryParams.length} OR LOWER(disputes.description) LIKE $${queryParams.length})`;
    }

    // Pagination
    page = parseInt(page);
    limit = parseInt(limit);
    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;
    const offset = (page - 1) * limit;

    // Count query
    const countQuery = `SELECT COUNT(*) ${baseQuery}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalRecords = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRecords / limit);

    // Data query with ORDER + LIMIT/OFFSET
    const dataQuery = `
    SELECT disputes.*, users.name AS requester_name, conveyancers.name AS conveyancers_name
    ${baseQuery}
    ORDER BY disputes.created_at DESC
    LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
  `;
    const result = await pool.query(dataQuery, [...queryParams, limit, offset]);

    return res.status(200).json({
      page,
      limit,
      offset,
      totalRecords,
      totalPages,
      disputes: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

// Get a specific dispute by ID
exports.getDisputeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM disputes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dispute not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new dispute
exports.createDispute = async (req, res) => {
  const { requester_id, conveyancer_id, property_ref_id, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO disputes (requester_id, conveyancer_id, property_ref_id, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [requester_id, conveyancer_id, property_ref_id, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update dispute status (resolve, reject, in review)
exports.updateDisputeStatus = async (req, res) => {
  const { id } = req.params;
  const { status, resolution } = req.body;

  try {
    const result = await pool.query(
      'UPDATE disputes SET status = $1, resolution = $2, resolved_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [status, resolution, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dispute not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a conversation between admin and dispute raiser
exports.addConversation = async (req, res) => {
  const { dispute_id, sender_id, receiver_id, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO dispute_conversations (dispute_id, sender_id, receiver_id, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [dispute_id, sender_id, receiver_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all conversations for a dispute
exports.getDisputeConversations = async (req, res) => {
  const { dispute_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM dispute_conversations WHERE dispute_id = $1 ORDER BY sent_at ASC',
      [dispute_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a dispute (hard delete)
exports.deleteDispute = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM disputes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dispute not found' });
    }
    res.status(200).json({ message: 'Dispute deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
