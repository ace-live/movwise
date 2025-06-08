const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/questions', require('./routes/questions'));
app.use('/api/email', require('./routes/email'));
app.use('/api/admin/user', require('./routes/user'));
app.use('/api/admin/dispute', require('./routes/dispute'));
app.use('/api/admin/conveyancer', require('./routes/conveyancer'));

// Just for testing API connection
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the Node.js API!' });
});

// Serve static React files (after build)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// For all other routes, serve React's index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });
 

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
