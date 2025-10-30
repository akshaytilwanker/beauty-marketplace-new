import express from 'express';
import { setRoutes } from './routes/index';
import { applyMiddleware } from './middleware/index';

const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
applyMiddleware(app);

// Set up routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});