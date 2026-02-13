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
        success: true,
        message: '🚀 AIFSD Backend API is running!',
        version: '1.0.0',
        author: 'Upwan Singh',
        endpoints: {
            crypto: {
                'POST /api/crypto/hash': 'Hash a password with SHA-256',
                'GET  /api/crypto/token': 'Generate a random reset token',
                'POST /api/crypto/verify': 'Verify a password against a hash'
            },
            files: {
                'GET /api/files/read': 'Read data/data.txt contents',
                'GET /api/files/notes': 'Read docs/notes.txt contents',
                'GET /api/files/info': 'Get file metadata (size, dates)'
            },
            system: {
                'GET /api/system/info': 'Server OS, CPU, memory, uptime info'
            },
            url: {
                'POST /api/url/parse': 'Parse a URL into its components'
            }
        }
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
