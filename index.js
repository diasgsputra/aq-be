// require('dotenv').config();


const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const cors = require('cors');


const app = express();
const PORT = 3000;

// Middleware
app.use(cors({origin: '*',credentials: true}));
app.use(express.json());

// Routes
app.use('/api/task', taskRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
