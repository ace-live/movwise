const pool = require('../config/db');

exports.submitQuote = async (req, res) => {
    const { user_id, conveyencor_id, message, response } = req.body;
    try {
        const random6Digit = Math.floor(100000 + Math.random() * 9000);
        const values = [random6Digit,response, 3, 1,1];
        const queryforProperty = `
        INSERT INTO property_details (property_ref_id,response, stage, created_by,updated_by)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING property_ref_id
        `;
        const propertyResponse = await pool.query(queryforProperty, values);
        const property_ref_id = propertyResponse.rows[0].property_ref_id;
        const result = await pool.query(
            'INSERT INTO quote_requests (requester_id, conveyancer_id,property_ref_id,message,status) VALUES ($1, $2,$3,$4,$5) RETURNING id, status',
            [user_id, conveyencor_id, property_ref_id, message, 'pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}