const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Resolve paths relative to project root (not relative to this file)
const dataDir = path.join(__dirname, '..', '..', 'data');
const docsDir = path.join(__dirname, '..', '..', 'docs');

// GET /api/files/read — Read and return data/data.txt
router.get('/read', (req, res) => {
    try {
        const filePath = path.join(dataDir, 'data.txt');
        const content = fs.readFileSync(filePath, 'utf8');

        res.json({
            success: true,
            data: {
                fileName: 'data.txt',
                content,
                characterCount: content.length,
                lineCount: content.split('\n').length
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/files/notes — Read and return docs/notes.txt
router.get('/notes', (req, res) => {
    try {
        const filePath = path.join(docsDir, 'notes.txt');
        const content = fs.readFileSync(filePath, 'utf8');

        res.json({
            success: true,
            data: {
                fileName: 'notes.txt',
                content,
                characterCount: content.length,
                lineCount: content.split('\n').length
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/files/info — Return file metadata for both files
router.get('/info', (req, res) => {
    try {
        const dataFile = path.join(dataDir, 'data.txt');
        const notesFile = path.join(docsDir, 'notes.txt');

        const getFileInfo = (filePath) => {
            const stats = fs.statSync(filePath);
            return {
                name: path.basename(filePath),
                path: path.relative(path.join(__dirname, '..', '..'), filePath),
                sizeBytes: stats.size,
                sizeKB: (stats.size / 1024).toFixed(2) + ' KB',
                created: stats.birthtime,
                lastModified: stats.mtime,
                isFile: stats.isFile()
            };
        };

        res.json({
            success: true,
            data: {
                files: [getFileInfo(dataFile), getFileInfo(notesFile)]
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
