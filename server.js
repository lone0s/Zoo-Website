/**Consts decls**/
const express = require("express")
const app = express()

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

app.get('/acceuil', (req, res) => {
    res.send("Page d'acceuil")
})

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

