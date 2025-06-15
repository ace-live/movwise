const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: 'postgresql://postgres:Jose12@98@localhost:5432/trialdb',
});

module.exports = pool;
