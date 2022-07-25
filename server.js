// Dependencies

var express = require("express");

var app = express();

const fs = require("fs");

const path = require("path");

const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const PORT = process.env.PORT || 3001;

// Middleware

app.use(express.static("./develop/public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes

app.get("/api/notes", (req, res) => {

    readFile("./develop/db/db.json", "utf8")
    .then( function(notesdata) {
        let notelist = [].concat(notesdata);

        res.json(notelist)
    }

)})

app.post ("/api/notes", (req, res) => {
    const noteBody = req.body;
    readFile("./develop/db/db.json", "utf8")
    .then( function(notesdata) {
        let notelist = [].concat(JSON.parse(notesdata));
        noteBody.id = notelist.length + 1;
        notelist.push(notesdata);
        return notelist;
    } )
    .then( function(notelist) {
        writeFile("./develop/db/db.json", JSON.stringify(notelist))
        res.json(notesdata);
    })
})

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