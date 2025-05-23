const pool = require('../config/db');

exports.getQuestionsByCategory = async (req, res) => {
  const { category_id } = req.body;
  try {
    const result = await pool.query(
      'select * from question_details where categoryid = $1',
      [category_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};