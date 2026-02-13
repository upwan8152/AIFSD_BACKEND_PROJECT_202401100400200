const express = require('express');
const cors = require('cors');

// Import route modules
const cryptoRoutes = require('./routes/cryptoRoutes');
const fsRoutes = require('./routes/fsRoutes');
const osRoutes = require('./routes/osRoutes');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// ─── API Routes ─────────────────────────────────────────────
app.use('/api/crypto', cryptoRoutes);
app.use('/api/files', fsRoutes);
app.use('/api/system', osRoutes);
app.use('/api/url', urlRoutes);

// ─── Root Route ─────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        name: 'Upwan Singh',
        age: 20,
        email: 'upwan8152@gmail.com',
        college: 'KIET Group of Institutions'
    });
});

// ─── Health Check ───────────────────────────────────────────
app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// ─── 404 Handler ────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.url} not found`,
        hint: 'Visit GET / to see all available endpoints'
    });
});

// ─── Error Handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 AIFSD Backend API Server`);
    console.log(`   Running on: http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Time: ${new Date().toISOString()}\n`);
});
