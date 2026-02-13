# AIFSD Backend Project 🚀

A fully functional **Node.js REST API** built with Express, demonstrating core Node.js modules (crypto, fs, os, url) through clean API endpoints.

## Features

- **Crypto API** — Password hashing (SHA-256), token generation, hash verification
- **File System API** — Read files, get file metadata
- **System Info API** — OS platform, CPU, memory, uptime details
- **URL Parser API** — Parse any URL into its components
- **CORS enabled** — Ready for frontend integration
- **Error handling** — Proper 404 and error responses

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode (auto-restart with nodemon)
npm run dev

# Run in production mode
npm start
```

Server starts at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info & all available endpoints |
| GET | `/health` | Health check |
| POST | `/api/crypto/hash` | Hash a password with SHA-256 |
| GET | `/api/crypto/token` | Generate a random reset token |
| POST | `/api/crypto/verify` | Verify password against a hash |
| GET | `/api/files/read` | Read data.txt contents |
| GET | `/api/files/notes` | Read notes.txt contents |
| GET | `/api/files/info` | File metadata (size, dates) |
| GET | `/api/system/info` | Server system information |
| POST | `/api/url/parse` | Parse a URL into components |

## Example Requests

```bash
# Hash a password
curl -X POST http://localhost:3000/api/crypto/hash \
  -H "Content-Type: application/json" \
  -d '{"password": "MySecret123"}'

# Generate a token
curl http://localhost:3000/api/crypto/token

# Get system info
curl http://localhost:3000/api/system/info

# Parse a URL
curl -X POST http://localhost:3000/api/url/parse \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com:8080/path?key=value"}'
```

## Project Structure

```
backend/
├── src/
│   ├── index.js              # Express server entry point
│   ├── routes/               # API route handlers
│   │   ├── cryptoRoutes.js   # /api/crypto endpoints
│   │   ├── fsRoutes.js       # /api/files endpoints
│   │   ├── osRoutes.js       # /api/system endpoints
│   │   └── urlRoutes.js      # /api/url endpoints
│   └── modules/              # Standalone module demos (learning reference)
│       ├── cryptoModule.js
│       ├── fsModule.js
│       ├── osModule.js
│       └── urlModule.js
├── data/
│   └── data.txt              # Sample data file
├── docs/
│   └── notes.txt             # Documentation notes
├── package.json
└── README.md
```

## Deployment (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy!

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5
- **Modules**: crypto, fs, os, url (Node.js built-ins)

---

Made with ❤️ by Upwan Singh | AIFSD Project