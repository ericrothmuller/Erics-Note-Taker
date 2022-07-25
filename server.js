// Dependencies

var express = require("express");

var app = express();

var fs = require("fs");

const PORT = 3000;

// Middleware



// Routes

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});



// PORT Listener

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);