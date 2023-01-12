/**Consts decls**/
const express = require("express")
const app = express()

let fs = require ('fs')
const {Urls} = require("./src/urls");

/**Server params**/
const hostname = '127.0.0.1';
const port = 8000;

/**Routes decls**/
//const {eventRouter} = require("./event-router")

/**Routes param**/
//TODO

/**------------------------------------------------------------------------------------------------**/

/**Routes**/
app.get('/',
    (req, res) => {
        res.redirect('/acceuil')
    }
);

app.get(Urls.Acceuil, (req, res) => {
    res.sendFile(__dirname + '/src/public/acceuil.html');
});

app.get(Urls.AnimalsList, (req, res) => {
    res.sendFile(__dirname + '/src/public/animalList.html');
});

//TODO : Definir toutes les routes

/**Donnees**/

app.post("/_api/connectedUser", (req, res)=>{
    //TODO
});

app.post("/_api/animals", (req, res)=>{
    //TODO
});

/**------------------------------------------------------------------------------------------------**/

/**Server setup**/
app.listen(port, hostname, () => {
    console.log(`Currently listening on ${hostname}:${port}`);
})

