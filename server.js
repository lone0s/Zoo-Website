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

/**------------------------------------------------------------------------------------------------**/

/**Server setup**/
app.listen(port, hostname, () => {
    console.log(`Currently listening on ${hostname}:${port}`);
})

