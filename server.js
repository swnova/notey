const express = require('express');
const PORT = 4000;
const path = require('path');
const fs = require('fs');
const uniqueId = require('generate-unique-id')
const allNotes = require('./db/db.json');
const { equal } = require('assert');

let app = express()
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/notes',(req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// app.get('/notes/:noteId',(req,res)=>{
//     for (let i = 0; i < newNote.length; i++){
//         const thisNote = notes[i];
//         if(thisNote.id==req.params.noteId){
//             return res.json(thisNote)
//         }

//     }
//     return res.status(404).send("note doesnt exist")
// })

app.post('/api/notes', (req, res)=> {
    let newNote = req.body;
    newNote.id = uniqueId();
    console.log(allNotes);
    if(typeof allNotes === 'string'){
    JSON.parse(allNotes).push(newNote)
    }else {
        allNotes.push(newNote)
    }
    fs.writeFile('./db/db.json', JSON.stringify(allNotes), function (err) {
        if (err) {
            res.json(err);}
        // pushed into db but need to show on screen
        res.json(newNote);
});
    
});


    
app.get('/api/notes', (req,res)=>{
    res.json(allNotes);
})

app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, ()=>{
    console.log('listening on port', PORT)
})