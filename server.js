/**---------------------------------------------------- IMPORTS ----------------------------------------------------**/
import express, {response} from "express"
import * as dotenv from "dotenv"
import * as database from "./database/db.js";
import bodyParser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';
import * as Db from "./database/db.js";

/**------------------------------------------------- DECLARATIONS --------------------------------------------------**/
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Server params **/
const hostname = '127.0.0.1';
const port = 8000;

/** Token Config **/
dotenv.config({path : './.env'})

/** DB Init **/
const db = database.initConnectionToDb();

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

app.get("/_api/animals/:id", (req, res)=>{
    //TODO
    res.status(200).json(Db.getAnimal(req.params.id))
});
app.get("/_api/animals/", (req, res)=>{
    //TODO
    res.status(200).json(Db.getAnimaux())
});

/**------------------------------------------------------------------------------------------------**/
//TODO : Definir toutes les routes

/**Donnees**/
app.use(bodyParser.json());

app.post("/_api/inscriptionUser", (req, res)=>{
    let result = {};
    try {
        database.addUser(req.body.courriel, req.body.motDePasse, database.roles.indexOf("USER"));
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
        idUtilisateur = database.findUser(req.body.courriel, req.body.motDePasse);
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
app.listen( 8000, hostname, () => {
    console.log(`Currently listening on ${hostname}:${port}`);
})

/**------------------------------------------------------------------------------------------------**/
/**Bootstrap**/

app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
