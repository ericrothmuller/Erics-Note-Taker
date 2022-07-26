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

app.use(express.static("./develop/public"));
app.use(express.urlencoded({extended: true}));

// Routes

// app.post("/", (req, res) => {
//     console.log(req)
// })

app.get("/api/notes", (req, res) => {

    readFile("./develop/db/db.json", "utf8").then(function(data) {
        const allNotes = [].concat(JSON.parse(data));
        res.json(allNotes);
    })

});

// app.post("/api/notes", (req, res) => {
//     const noteBody = req.body;
//     readFile("./develop/db/db.json", "utf8").then(function(data) {

//     })
// });

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

// app.delete ("/api/notes/:id", (req, res) => {
//     console.log("params: ", req.params);
//     console.log("query: ", req.query);
// });

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