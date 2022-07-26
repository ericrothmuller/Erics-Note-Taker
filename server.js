// Dependencies

var express = require("express");

var app = express();

const fs = require("fs");

const util = require("util");

const path = require("path");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const PORT = process.env.PORT || 3001;

// Middleware

app.use(express.static("./develop/public"));
app.use(express.urlencoded({extended: true}));

// Routes

// /api/notes GET REQUEST

app.get("/api/notes", (req, res) => {

    readFile("./develop/db/db.json", "utf8").then(function(data) {
        const allNotes = [].concat(JSON.parse(data));
        res.json(allNotes);
    })

});

// /api/notes POST REQUEST

app.post ("/api/notes", (req, res) => {
    const noteBody = req.body;
    readFile("./develop/db/db.json", "utf8")
    .then( function(notesdata) {

        const notelist = [].concat(JSON.parse(notesdata))
        notelist.push(noteBody);
        return notelist;
    } )
    .then( function(notelist) {
        console.log(notelist);
        writeFile("./develop/db/db.json", JSON.stringify(notelist))
        res.json();
    })
})

// General Routes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"))
});


// PORT Listener

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);