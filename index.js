require('dotenv').config();
const express = require('express');
const DbConnect = require('./database');
const router = require('./routes');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const corsOption = {
    credentials: true,
    origin: true,
}

app.use(cookieParser());
app.use(cors(corsOption));

app.get('/', (req, res) => res.send('Server is running...'));
DbConnect();
app.use(express.json({ limit: '8mb' }));
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));