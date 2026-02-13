const express = require('express');
const router = express.Router();

// POST /api/url/parse — Parse a URL and return its components
router.post('/parse', (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required. Send JSON: { "url": "https://example.com/path?key=value" }'
            });
        }

        const parsedUrl = new URL(url);

        // Convert search params to an object
        const params = {};
        parsedUrl.searchParams.forEach((value, key) => {
            params[key] = value;
        });

        res.json({
            success: true,
            data: {
                original: url,
                protocol: parsedUrl.protocol,
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || '(default)',
                pathname: parsedUrl.pathname,
                search: parsedUrl.search || '(none)',
                queryParams: params,
                hash: parsedUrl.hash || '(none)',
                origin: parsedUrl.origin,
                fullUrl: parsedUrl.href
            }
        });
    } catch (err) {
        if (err.code === 'ERR_INVALID_URL') {
            return res.status(400).json({
                success: false,
                error: `Invalid URL: "${req.body.url}". Please provide a valid URL with protocol (e.g., https://example.com)`
            });
        }
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
