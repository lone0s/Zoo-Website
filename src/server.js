/**Imports**/
//import React from "react";
//import ReactDOM from "react-dom";

/**Consts decls**/
const express = require("express")
const app = express()
//const router = app.Router()

/**Routes decls**/
//const {eventRouter} = require("./event-router")

/**Server params**/
const hostname = '127.0.0.1';
const port = 8000;

/**Routes param**/
/*router.get('/router-test', (req, res) => {
    res.send('./router-test')
})*/

/**Routes**/
app.get('/',
    (req, res) => {
        res.redirect('/acceuil')
    }
);

app.get('/acceuil', (req, res) => {
    res.send("Page d'acceuil")
})

app.listen(port, hostname, () => {
    console.log(`Currently listening on ${hostname}:${port}`);
})

