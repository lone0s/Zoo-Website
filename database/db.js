import Database from "better-sqlite3";

const db = new Database("./database/dbzoo.db", {}, {verbose: console.log}, function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
    this.pragma('journal_mode = WAL');
    this.pragma('synchronous = NORMAL');
});

export function initConnectionToDb() {
    return db;
}

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


export const roles = ["ANON","USER","ADMIN","SUPER_ADMIN"];

const users = {uname : "karimBY" , passwd : "kbsuper4dm!n", role : roles.indexOf("SUPER_ADMIN")};

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
function addUserObj(user) {
    if(!userExists(user.uname)) {
        let insert = "INSERT INTO USER VALUES (NULL,@uname,@passwd,@role)";
        let res = db.prepare(insert).run(user);
    }
    throw(`User ${user.uname} already exists`);
}

function addUser(uname, passwd, role) {
    if(!userExists(uname)) {
        let insert = "INSERT INTO USER VALUES (NULL,@uname,@passwd,@role)";
        let res = db.prepare(insert).run({uname : uname, passwd : passwd, role : role});
    }
    throw(`User ${uname} already exists`);
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

function findUser(uname, passwd) {
    let select = "SELECT * FROM USER WHERE uname = ? AND passwd = ?";
    let res = db.prepare(select).get(uname, passwd);
    if (res === undefined)
        throw(`User ${uname} not found`);
    else
        return res;
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

function removeFavoris(idUser, idAnimal) {
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

function getFavoriteAnimalsFromUser(idUser) {
    let sql = "SELECT * FROM ANIMAL WHERE idAnimal IN (SELECT idAnimal FROM FAVORIS WHERE idUser = ?)";
    let res = db.prepare(sql).all(idUser);
    if (res === undefined)
        throw(`No favorite animals for user ${idUser}`);
    else
        return res;
}
function getFavoriteUsersFromAnimal(idAnimal) {
    let sql = "SELECT * FROM FAVORIS WHERE idAnimal = ?";
    let res = db.prepare(sql).all(idAnimal);
    if (res === undefined)
        throw(`No favorite users for animal ${idAnimal}`);
    else
        return res;
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

function getEnclosFromAnimal(idAnimal) {
    let sql = "SELECT * FROM ENCLOS WHERE idEnclos = (SELECT idEnclos FROM ANIMAL WHERE idAnimal = ?)";
    let res = db.prepare(sql).get(idAnimal);
    if (res === undefined)
        throw(`No enclos for animal with id ${idAnimal}`);
    else
        return res;
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

function getAnimalsFromEnclos(idEnclos) {
    let select = "SELECT * FROM ANIMAL WHERE idEnclos = ?";
    let res = db.prepare(select).all(idEnclos);
    if (res === undefined)
        throw(`No animal in enclos ${idEnclos}`);
    else
        return res;
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



/*** Tokens ***/

function addUserToken(idUser, token) {
    let sql = "UPDATE USER SET token = ? WHERE idUser = ?";
    let res = db.prepare(sql).run(token, idUser);
    if (res.changes === 0)
        throw(`No user with id ${idUser}`);
}

function getUserToken(idUser) {
    let sql = "SELECT token FROM USER WHERE idUser = ?";
    let res = db.prepare(sql).get(idUser);
    if (res === undefined)
        throw(`No user with id ${idUser}`);
    else
        return res;
}

function getUserByToken(token) {
    let sql = "SELECT * FROM USER WHERE token = ?";
    let res = db.prepare(sql).get(token);
    if (res === undefined)
        throw(`No user with token ${token}`);
    else
        return res;
}

function deleteToken(idUser) {
    let sql = "UPDATE USER SET token = NULL WHERE idUser = ?";
    let res = db.prepare(sql).run(idUser);
    if (res.changes === 0)
        throw(`No user with id ${idUser}`);
}

function updateToken(idUser, token) {
    let sql = "UPDATE USER SET token = ? WHERE idUser = ?";
    let res = db.prepare(sql).run(token, idUser);
    if (res.changes === 0)
        throw(`No user with id ${idUser}`);
}

function userHasNoToken(idUser) {
    return getUserToken(idUser) === null;
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

/*** Generalizing CRUD operations ***/

function insertCreator(tableName, fields) {
    let sql = `INSERT INTO ${tableName} VALUES (NULL`;
    for (let i = 0; i < fields.length; i++) {
        sql += ",?";
    }
    sql += ")";
    return sql;
}

function deleteCreator(tableName, fields) {
    let sql = `DELETE FROM ${tableName} WHERE `;
    for (let i = 0; i < fields.length; i++) {
        sql += `${fields[i]} = ?`;
        if (i < fields.length - 1)
            sql += " AND ";
    }
    return sql;
}

function updateCreator(tableName, fields, id) {
    let sql = `UPDATE ${tableName} SET `;
    for (let i = 0; i < fields.length; i++) {
        sql += `${fields[i]} = ?`;
        if (i < fields.length - 1)
            sql += ",";
    }
    sql += ` WHERE id${tableName} = ${id}`;
    return sql;
}

const tabl = "ANIMAL"
const flds = Object.keys(animals[0]);
// console.log(flds[0]);
const values = Object.values(animals[0]);

// const insert = insertCreator(tabl, flds);
// console.log(insert);

function selectCreator(tableName, fields) {
    let sql = `SELECT * FROM ${tableName}`;
    console.log(sql);
    if (fields !== undefined) {
        sql += " WHERE ";
        for (let i = 0; i < fields.length; i++) {
            sql += `${fields[i]} = ?`;
            if (i < fields.length - 1)
                sql += " AND ";
        }
    }
    return sql;
}


function get(tableName,fields,values) {
    let sql = selectCreator(tableName,fields);
    let res = db.prepare(sql).get(values);
    if (res === undefined)
        throw(`No ${tableName} with ${fields} = ${values}`);
    else
        return res;
}

export {
    animalExists,
    addAnimal,
    getAnimal,
    deleteAnimal,
    getAnimaux,
    userExists,
    addUserObj,
    addUser,
    getUser,
    deleteUser,
    getUsers,
    roleExists,
    addRole,
    getRole,
    getRoles,
    getRoleName,
    getFavoris,
    getFavoriteAnimals,
    getFavoriteUsers,
    especeAlreadyExists,
    addEspece,
    getEspece,
    getEspeces,
    enclosAlreadyExists,
    addEnclos,
    getEnclosId,
    getEnclos,
    deleteEnclos,
    removeFavoris,
    addFavoris,
    addUserToken,
    getUserToken,
    getUserByToken,
    deleteToken,
    updateToken,
    userHasNoToken,
    getAnimalsFromEnclos,
    getEnclosFromAnimal,
    getFavoriteAnimalsFromUser,
    getFavoriteUsersFromAnimal,
    findUser,
    // connectToDb,
    db
};