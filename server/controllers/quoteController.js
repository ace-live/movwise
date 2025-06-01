const pool = require('../config/db');

exports.submitQuote = async (req, res) => {
    const { user_id, quote_details } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO quotes (user_id, quote_details) VALUES ($1, $2) RETURNING quote_id, user_id, quote_details',
        [user_id, quote_details]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }