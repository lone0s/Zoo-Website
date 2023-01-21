/**Consts decls**/
import express, {response} from "express"
const app = express()
import fs from "fs"
import Database from "better-sqlite3";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import * as Db from "./database/db.js";
import bodyParser from "body-parser";
import * as User from "./src/user.js";

/**Server params**/
const hostname = '127.0.0.1';
const port = 8000;
import path from 'path';
import {fileURLToPath} from 'url';
import * as DB from "./database/db.js";
import {setUserCookie} from "./src/user.js";
import {addUser} from "./database/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**------------------------------------------------------------------------------------------------**/
/*** Token init ***/
dotenv.config({path : './.env'})
/**------------------------------------------------------------------------------------------------**/
/*** DB init ***/
const db = DB.initConnectionToDb();


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

app.get('/animals', (req, res) => {
    res.sendFile(__dirname + '/src/public/animalList.html');
});

app.get("/user/validateToken", (req, res) => {

});

/**------------------------------------------------------------------------------------------------**/
//TODO : Definir toutes les routes

/**Donnees**/
app.use(bodyParser.json());

app.post("/_api/inscriptionUser", (req, res)=>{
    let result = {};

    try {
        Db.addUser(req.body.courriel, req.body.motDePasse, Db.roles.indexOf("USER"));
        result = {"resultat": true};
    }
    catch (e) {
        console.log(e);
    }

    res.send(result);
});

app.post("/_api/connectionUser", (req, res)=>{
    let idUtilisateur = [];

    try {
        idUtilisateur = Db.findUser(req.body.courriel, req.body.motDePasse);
    }
    catch (e) {
        console.log(e);
    }

    res.send(idUtilisateur);
});

app.post("/_api/animals", (req, res)=>{
    //TODO
});

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
