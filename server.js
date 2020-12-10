// Dependancies
// We need to require all of our dependacies
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
// Global Variables
// Declaring global variables
const PORT = process.env.PORT || 8080;
// const db = require("Develop/db/db.json");
let num = 0
// Middlewear
// we need the urlencoded middle which gives us access to req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
// We need a middlewear to have our css and javascript files be loaded from the public folder
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});


app.get("/notes.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
// got tutor help

    app.post("/api/notes", function(req, res) {
    
        fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const returnedData = JSON.parse(data);
        let noteId = req.body;
        let id = returnedData.length;
        noteId.id = id +1;
        returnedData.push(noteId);
        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(returnedData),err => {
        if (err) throw err;
        res.json(returnedData);
           
        })
        });
       
        });
        
  



// Server listener
app.listen(PORT, () => {
    console.log("You started up the server");
})

// second no show means no more tutoring
//following appointments
    //two ways to make appointments
        //same way i made this one and find what works for me
        //second way to set aside a certain time.
        //single 2-hour appointment
        //1 hour appointment through out the week
        //at the end of the session required to fillout the survey
        //