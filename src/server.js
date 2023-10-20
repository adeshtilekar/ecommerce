// server.js
const http = require('http');
const url = require('url');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const PORT = 5000;

// Create and connect to the database
const db = new sqlite3.Database('/mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Create a table if it doesn't exist
db.run(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  );
`);

// Function to handle HTTP requests
const handleRequest = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'POST' && pathname === '/api/addData') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const { name, age } = JSON.parse(body);
        const insertDataQuery = `INSERT INTO users (name, age) VALUES ('${name}', ${age});`;
        db.run(insertDataQuery, function (err) {
          if (err) {
            console.error('Error inserting data:', err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to insert data into the database.' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          }
        });
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to store data.' }));
      }
    });
  } else {
    // Serve the React app
    fs.readFile('./build/index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading the file.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
};

// Create the server
const server = http.createServer(handleRequest);

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
