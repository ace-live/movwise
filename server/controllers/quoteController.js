const pool = require('../config/db');

exports.submitQuote = async (req, res) => {
    const { user_id, conveyencor_id, message, response } = req.body;
    try {
        const random6Digit = Math.floor(100000 + Math.random() * 9000);
        const values = [random6Digit,JSON.stringify(response), 3, 1,1];
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

exports.getQuotesByUser = async (req, res) => {
    const { user_id } = req.body;
    try {
        const result = await pool.query(
            'SELECT quote_requests.id, quote_requests.requester_id, quote_requests.conveyancer_id, quote_requests.property_ref_id, quote_requests.message, quote_requests.status, property_details.property_ref_id FROM quote_requests INNER JOIN property_details ON quote_requests.property_ref_id = property_details.property_ref_id WHERE quote_requests.requester_id = $1',
            [user_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getQuoteDetails = async (req, res) => {
    const { quote_id } = req.body;
    try {
        const result = await pool.query(
            'SELECT quote_requests.id, quote_requests.requester_id, quote_requests.conveyancer_id, quote_requests.property_ref_id, quote_requests.message, quote_requests.status, property_details.property_ref_id, property_details.response FROM quote_requests INNER JOIN property_details ON quote_requests.property_ref_id = property_details.property_ref_id WHERE quote_requests.id = $1',
            [quote_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Quote not found' });
        }
        const row = result.rows[0];
        row.response = JSON.parse(row.response);
        res.status(200).json({ quote_details: row });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}