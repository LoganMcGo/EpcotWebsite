#!/bin/bash

# Set the port
PORT=8000

echo "Starting server on http://localhost:$PORT"

# Try Python 3 server first
if command -v python3 &> /dev/null; then
    echo "Using Python 3 HTTP server"
    python3 -m http.server $PORT
# Then try Python 2 server
elif command -v python &> /dev/null; then
    echo "Using Python 2 HTTP server"
    python -m SimpleHTTPServer $PORT
# Finally try Node.js
elif command -v node &> /dev/null; then
    echo "Using Node.js HTTP server"
    node -e "
        const http = require('http');
        const fs = require('fs');
        const path = require('path');
        
        const server = http.createServer((req, res) => {
            let filePath = '.' + req.url;
            if (filePath === './') {
                filePath = './index.html';
            }
            
            const extname = path.extname(filePath);
            let contentType = 'text/html';
            
            switch (extname) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.svg':
                    contentType = 'image/svg+xml';
                    break;
            }
            
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        fs.readFile('./404.html', (err, content) => {
                            if (err) {
                                res.writeHead(404);
                                res.end('404 Not Found');
                            } else {
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(content, 'utf-8');
                            }
                        });
                    } else {
                        res.writeHead(500);
                        res.end('Server Error: ' + err.code);
                    }
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        });
        
        server.listen($PORT, () => {
            console.log('Server running at http://localhost:$PORT/');
        });
    "
else
    echo "Error: Neither Python nor Node.js is available. Please install one of them to run the server."
    exit 1
fi
