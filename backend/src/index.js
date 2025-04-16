import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Use Morgan for HTTP request logging
app.use(morgan('combined', {
  stream: {
    write: (message) => console.log(message.trim()), // Pipe Morgan logs to console
  },
}));

// Import and use routes
app.use('/api', routes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`, { stack: err.stack }); // ✅ FIXED: wrapped in backticks
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // ✅ FIXED: wrapped in backticks
});
