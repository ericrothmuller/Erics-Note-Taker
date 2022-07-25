// Dependencies

var express = require("express");

var app = express();

const fs = require("fs");

const path = require("path");

const util = require("util");

const PORT = 3000;

// Middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get ("/api/notes", (req, res) => {

    res.sendFile(path.join(__dirname, "/db/db.json"))

})

app.post ("/api/notes", (req, res) => {

})

// Read and Write Notes




// PORT Listener

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);