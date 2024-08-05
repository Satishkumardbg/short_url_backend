import dotenv from 'dotenv';
import express from "express"
import cors from "cors"

import authRoutes from './routes/authRoutes.js';
import urlRoutes from "./routes/urlRoutes.js"
import authenticateToken from './middleware/auth.js';
import authUrlRoutes from './routes/authUrlRoutes.js';
const app = express();
const port = process.env.PORT


dotenv.config();

app.use(cors({
    origin: ['http://localhost:3000', 'https://s4url.netlify.app','https://s4url.netlify.app/', '/'],
    credentials: true,
  }));



app.use(express.json());

// Routes
app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/api/auth', authRoutes);
app.use('/api/authurls',authenticateToken, authUrlRoutes);
app.use('/api/urls', urlRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

