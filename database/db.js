// const sqlite3 = require('sqlite3').verbose();
const Sqlite3DB = require('better-sqlite3');

let db = new Sqlite3DB("./dbzoo.db",{}/*,{verbose : console.log}*/, (err) => {
    if (err)
        throw("Database connection failed : " + err.message);
});

if (db.open)
    console.log("Database connection successful");
else
    throw("Database connection failed");

function stopDb() {
   db.close();
}

const especes = ["Leo","Pardus"];

const enclos = [
    {x : "50", y:"50"},
    {x : "150", y:"150"}
]

const animals = [
    {nom : "Lion d'Asie", nomComplet : "Panthera leo persica", idEspece : 0, idEnclos : 0},
    {nom : "Lion d'Afrique", nomComplet : "Panthera leo leo", idEspece: 0, idEnclos : 0},
    {nom : "Leopard de Perse", nomComplet : "Panthera pardus saxicolor", idEspece: 1, idEnclos: 1},
    {nom : "Leopard indien", nomComplet: "Panthera pardus fusca", idEspece: 1, idEnclos: 1}
];


const roles = ["ANON","USER","ADMIN","SUPER_ADMIN"];

const users = {uname : "karimBY" , passwd : "kbM12223super4dm!n", role : roles.indexOf("SUPER_ADMIN")};

/**
 * Functions to create all database tables
 */
function createAnimalTable() {
    let sql = "CREATE TABLE ANIMAL (idAnimal INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, idEspece INTEGER, idEnclos INTEGER, nomComplet TEXT," +
        " FOREIGN KEY (idEspece) REFERENCES ESPECE(idEspece), FOREIGN KEY (idEnclos) REFERENCES ENCLOS(idEnclos))";
    db.prepare(sql).run();
}

function createEspeceTable() {
    let sql = "CREATE TABLE ESPECE (idEspece INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT)";
    db.prepare(sql).run();
}

function createRoleTable() {
    let sql = "CREATE TABLE ROLE (idRole INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT)";
    db.prepare(sql).run();
}

function createEnclosTable() {
    let sql = "CREATE TABLE ENCLOS (idEnclos INTEGER PRIMARY KEY AUTOINCREMENT, position INTEGER)";
    db.prepare(sql).run();
}

function createFavorisTable(){
    let sql = "CREATE TABLE FAVORIS (idUser INTEGER, idAnimal INTEGER, " +
        "FOREIGN KEY (idUser) REFERENCES USER(idUser),FOREIGN KEY (idAnimal) REFERENCES ANIMAL(idAnimal)" +
        "PRIMARY KEY (idUser,idAnimal))";
    db.prepare(sql).run();
}

function createUsersTable() {
    let sql = "CREATE TABLE USER (idUser INTEGER PRIMARY KEY AUTOINCREMENT, uname TEXT, passwd TEXT, idRole INTEGER," +
        " FOREIGN KEY (role) REFERENCES ROLE(idRole))";
    db.prepare(sql).run();
}

function createTables() {
    createAnimalTable();
    createEspeceTable();
    createRoleTable();
    createEnclosTable();
    createFavorisTable();
    createUsersTable();
}

/**
 * Functions to fill database tables
 */

function fillAnimal() {
    const insert = db.prepare("INSERT INTO ANIMAL VALUES (NULL,@nom,@idEspece,@idEnclos,@nomComplet)");
    const insertMany = db.transaction((animals) => {
        for (const animal of animals) {
            insert.run(animal);
        }
    });
    insertMany(animals);
}

function fillEspece() {
    const insert = db.prepare("INSERT INTO ESPECE VALUES (NULL,@nom)");
    const insertMany = db.transaction((especes) => {
        for (const espece of especes) {
            insert.run({nom : espece});
        }
    });
    insertMany(especes);
}

function fillRole() {
    const insert = db.prepare("INSERT INTO ROLE VALUES (NULL,@nom)");
    const insertMany = db.transaction((roles) => {
        for (const role of roles) {
            insert.run({nom : role});
        }
    });
    insertMany(roles);
}

function fillEnclos() {
    const insert = db.prepare("INSERT INTO ENCLOS VALUES (NULL,@position)");
    const insertMany = db.transaction((enclos) => {
        for (const encl of enclos) {
            insert.run(encl);
        }
    });
    insertMany(enclos);
}

function fillTables() {
    fillEspece();
    fillRole();
    fillEnclos();
    fillAnimal();
}

/**
 * Functions to do CRUD operations on database
 */

/*** Users ***/

function userExists(uname) {
    let select = "SELECT * FROM USER WHERE uname = ?";
    let res = db.prepare(select).get(uname);
    return res !== undefined;
}
function addUser(user) {
    if(!userExists(user.uname)) {
        let insert = "INSERT INTO USER VALUES (NULL,@uname,@passwd,@role)";
        let res = db.prepare(insert).run(user);
    }
    throw(`User ${user.uname} already exists`);
}

function getUser(id) {
    let select = "SELECT * FROM USER WHERE idUser = ?";
    let res = db.prepare(select).get(id);
    if (res === undefined)
        throw(`User with id ${id} not found`);
    else
        return res;
}

function deleteUser(id) {
    let del = "DELETE FROM USER WHERE idUser = ?";
    let res = db.prepare(del).run(id);
    if (res.changes === 0)
        throw(`User with id ${id} not found`);
}

/*** Roles ***/

function getRole(id) {
    let select = "SELECT * FROM ROLE WHERE idRole = ?";
    let res = db.prepare(select).get(id);
    if (res === undefined)
        throw(`No role with id ${id}`)
    else
        return res;
}

function roleExists(roleName) {
    let select = "SELECT * FROM ROLE WHERE nom = ?";
    let res = db.prepare(select).get(roleName);
    return res !== undefined;
}

function addRole(nomRole) {
    if (!roleExists(nomRole)) {
        let insert = "INSERT INTO ROLE VALUES (NULL,?)";
        let res = db.prepare(insert).run(nomRole);
        return res
            ? `Successfully added {$nomRole} to the database`
            : `No role added`;
    }
    throw(`Role ${nomRole} already exists`);
}

/*** FAVORIS ***/

function favorisAlreadyExists(idUser,idAnimal){
    let select = "SELECT * FROM FAVORIS WHERE idUser = ? AND idAnimal = ?";
    let res = db.prepare(select).get(idUser,idAnimal);
    return res !== undefined;
}
function addFavoris(idUser,idAnimal) {
    if(!favorisAlreadyExists(idUser,idAnimal)) {
        let insert = "INSERT INTO FAVORIS VALUES (?,?)";
        let res = db.prepare(insert).run(idUser, idAnimal);
    }
    throw(`Favorite between user ${idUser} and animal ${idAnimal} already exists`);
}

function removeFavorite(idUser,idAnimal) {
    let del = "DELETE FROM FAVORIS WHERE idUser = ? AND idAnimal = ?";
    let res = db.prepare(del).run(idUser,idAnimal);
    if (res.changes !== 1)
        throw(`No favorite between user ${idUser} and animal ${idAnimal}`);
}

function getFavoriteAnimals(idUser) {
    if(userExists(idUser)) {
        let select = "SELECT * FROM FAVORIS WHERE idUser = ?";
        return db.prepare(select).all(idUser);
    }
    else
        throw(`No user with id ${idUser}`);
}

function getFavoriteUsers(idAnimal) {
    if(animalExists(idAnimal)) {
        let select = "SELECT * FROM FAVORIS WHERE idAnimal = ?";
        return db.prepare(select).all(idAnimal);
    }
    else
        throw(`No animal with id ${idAnimal}`);
}

/*** Espece ***/

function getEspece(id) {
    let select = "SELECT * FROM ESPECE WHERE idEspece = ?";
    let res = db.prepare(select).get(id);
    if (res === undefined){
        throw (`No espece with id ${id}`);
    }
}

function especeAlreadyExists(especeName) {
    let select = "SELECT * FROM ESPECE WHERE nom = ?";
    let res = db.prepare(select).get(especeName);
    return res !== undefined;
}
function addEspece(nomEspece) {
    if(!especeAlreadyExists(nomEspece))
    {
        let insert = "INSERT INTO ESPECE VALUES (NULL,?)";
        let res = db.prepare(insert).run(nomEspece);
    }
    else
        throw(`Espece ${nomEspece} already exists`);
}

/*** Enclos ***/

function getEnclosId(position) {
    let sql = "SELECT idEnclos FROM ENCLOS WHERE position = ?";
    let res = db.prepare(sql).get(position);
    if (res === undefined)
        throw(`No enclos with position ${position}`);
    else
        return res;
}

function enclosAlreadyExists(position) {
    let select = "SELECT * FROM ENCLOS WHERE position = ?";
    let res = db.prepare(select).get(position);
    return res !== undefined;
}

function addEnclos(position) {
    if(!enclosAlreadyExists(position))
    {
        let insert = "INSERT INTO ENCLOS VALUES (NULL,?)";
        let res = db.prepare(insert).run(position);
    }
    else
        throw(`Enclos at position [${position}] already exists`);
}

function deleteEnclos(id) {
    let del = "DELETE FROM ENCLOS WHERE idEnclos = ?";
    let res = db.prepare(del).run(id);
    if (res.changes === 0)
        throw(`No enclos with id ${id}`);
}

/*** Animal ***/

function animalExists(idAnimal) {
    let select = "SELECT * FROM ANIMAL WHERE idAnimal = ?";
    let res = db.prepare(select).get(idAnimal);
    return res !== undefined;
}

function addAnimal(animal) {
    if(!animalExists(animal.idAnimal)) {
        let insert = "INSERT INTO ANIMAL VALUES (NULL,@nom,@espece,@enclos)";
        let res = db.prepare(insert).run(animal);
    }
    throw(`Animal ${animal.nom} already exists`);
}

function getAnimal(id) {
    let select = "SELECT * FROM ANIMAL WHERE idAnimal = ?";
    let res = db.prepare(select).get(id);
    if (res === undefined)
        throw(`No animal with id ${id}`);
    else
        return res;
}

function deleteAnimal(id) {
    let del = "DELETE FROM ANIMAL WHERE idAnimal = ?";
    let res = db.prepare(del).run(id);
    if (res.changes === 0)
        throw(`No animal with id ${id}`);
}

/*** Collection getters ***/
function getUsers() {
    let select = "SELECT * FROM USER";
    return db.prepare(select).all();
}

function getRoles() {
    let select = "SELECT * FROM ROLE";
    return db.prepare(select).all();
}

function getEspeces() {
    let select = "SELECT * FROM ESPECE";
    return db.prepare(select).all();
}

function getEnclos() {
    let select = "SELECT * FROM ENCLOS";
    return db.prepare(select).all();
}

function getAnimaux() {
    let select = "SELECT * FROM ANIMAL";
    return db.prepare(select).all();
}

function getFavoris() {
    let select = "SELECT * FROM FAVORIS";
    return db.prepare(select).all();
}

/*** Aux ***/

function getRoleName(id) {
    let sql = "SELECT nom FROM ROLE WHERE idRole = ?";
    let res = db.prepare(sql).get(id);
    if (res === undefined)
        throw(`No role with id ${id}`);
    else
        return res;
}

module.exports ={
    animalExists,
    addAnimal
}
