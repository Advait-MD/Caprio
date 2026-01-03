require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movie', require('./routes/movie'));
app.use('/api/taste', require('./routes/taste'));
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/play', require('./routes/play'));
app.use('/api/recommend', require('./routes/recommend'));

app.get('/', (req, res) => res.send('Caprio backend running'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
