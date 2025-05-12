const pool = require('../config/db');

exports.createReview = async (req, res) => {
    const { user_id, author_id, rating, comment } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO review (user_id, author_id, rating, content) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, author_id, rating, comment]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getReviews = async (req, res) => {
    const { author_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT 
                r.*, 
                a.name AS author_name,
                u.name AS user_name
             FROM review r
             JOIN users a ON r.author_id = a.id
             JOIN users u ON r.user_id = u.id
             WHERE r.author_id = $1`,
            [author_id]
        );
    
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}