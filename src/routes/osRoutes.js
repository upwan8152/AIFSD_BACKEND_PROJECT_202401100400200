const express = require('express');
const os = require('os');
const router = express.Router();

// GET /api/system/info — Return server system information
router.get('/info', (req, res) => {
    try {
        const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
        const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);
        const usedMemGB = ((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2);
        const uptimeHours = (os.uptime() / 3600).toFixed(2);

        res.json({
            success: true,
            data: {
                platform: os.platform(),
                type: os.type(),
                release: os.release(),
                architecture: os.arch(),
                hostname: os.hostname(),
                cpus: {
                    model: os.cpus()[0]?.model || 'Unknown',
                    cores: os.cpus().length,
                    speed: os.cpus()[0]?.speed + ' MHz' || 'Unknown'
                },
                memory: {
                    total: totalMemGB + ' GB',
                    free: freeMemGB + ' GB',
                    used: usedMemGB + ' GB',
                    usagePercent: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(1) + '%'
                },
                uptime: {
                    seconds: os.uptime(),
                    hours: uptimeHours + ' hrs'
                },
                homeDirectory: os.homedir(),
                tempDirectory: os.tmpdir(),
                nodeVersion: process.version
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
