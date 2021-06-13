const express = require('express')
const path = require('path');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const notesDb = require("./Develop/db/db.json");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// sending users to the correct html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, "./Develop/db/db.json")))

// Used static to fix console log error with < 
app.use(express.static(__dirname + '/Develop/public'));

app.get('/api/notes', (req, res) => {
    res.json(notesDb);
});

app.post('/api/notes', (req, res) => {

    const addNote = req.body;
    // creating a new ID for each note
    const uid = new ShortUniqueId()
    addNote.id = uid.stamp(10)
    console.log("++++" +  uid.stamp(10));
    notesDb.push(addNote);
    console.log(notesDb);

    let writeNote = JSON.stringify(notesDb);
    fs.writeFile("Develop/db/db.json", writeNote , (err)=>{
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json(notesDb);
  });




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));