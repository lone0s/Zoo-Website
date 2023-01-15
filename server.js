/**Consts decls**/
import express from "express"
const app = express()
import fs from "fs"
import Database from "better-sqlite3";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

/**Server params**/
const hostname = '127.0.0.1';
const port = 8000;
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**------------------------------------------------------------------------------------------------**/
/*** Token init ***/
dotenv.config();



/**------------------------------------------------------------------------------------------------**/
/*** DB init ***/
export let db = new Database("./database/dbzoo.db", {},{verbose : console.log}, (err) => {
    if (err)
        throw("Database connection failed : " + err.message);
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
});
if(db.open)
    console.log("Database connection success");

/**------------------------------------------------------------------------------------------------**/
/**Répertoire public rendu... public**/
app.use("/public", express.static(path.join(__dirname, "src/public/")));

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
    res.sendFile(__dirname + '/src/public/acceuil.html');
});

app.get('/inscription', (req, res) => {
    res.sendFile(__dirname + '/src/public/inscription.html');
});

app.get('/connexion', (req, res) => {
    res.sendFile(__dirname + '/src/public/connexion.html');
});

app.get('/animal/all', (req, res) => {
    res.sendFile(__dirname + '/src/public/animalList.html');
});

app.get("/user/validateToken", (req, res) => {

});

/**------------------------------------------------------------------------------------------------**/
//TODO : Definir toutes les routes

/**Donnees**/

/*
app.post("/_api/connectedUser", (req, res)=>{
    //TODO
});

app.post("/_api/animals", (req, res)=>{
    //TODO
});
*/

/**------------------------------------------------------------------------------------------------**/

/**Server setup**/
app.listen(process.env.PORT || 8000, hostname, () => {
    console.log(`Currently listening on ${hostname}:${port}`);
})


/**------------------------------------------------------------------------------------------------**/

/**Bootstrap**/

app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
