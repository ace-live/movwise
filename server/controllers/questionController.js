const pool = require('../config/db');

exports.getQuestionsByCategory = async (req, res) => {
  const { category_id } = req.body;
  try {



    const result = await pool.query(
      'SELECT question_details.id, question_details.question, question_details.description, question_details.values, question_types.type_description as questiontype FROM question_details INNER JOIN question_types ON question_details.questiontype=question_types.id where question_details.categoryid = $1',
      [category_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
