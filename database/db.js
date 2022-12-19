const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./dbzoo.db", (err) => {
    if (err)
        console.error(err.message);
    console.log('Connected to the database');
});

function stopDb() {
    db.close((err) =>{
      if(err)
          console.error(err.message);
        console.log("Interrupted connection to the database");
    })
};

const especes = ["Leo","Pardus"];

const enclos = [
    {x : "50", y:"50"},
    {x : "150", y:"150"}
]

const animals = [
    {nom : "Lion d'Asie", nomComplet : "Panthera leo persica", idEspece : 0},
    {nom : "Lion d'Afrique", nomComplet : "Panthera leo leo", idEspece: 0},
    {nom : "Leopard de Perse", nomComplet : "Panthera pardus saxicolor", idEspece: 1},
    {nom : "Leopard indien", nomComplet: "Panthera pardus fusca", idEspece: 1}
];

const roles = ["ANON","USER","ADMIN","SUPER_ADMIN"];

const user = {uname : "karimBY" , passwd : "kbM12223super4dm!n", role : roles.find(s => s === "SUPER_ADMIN")};


function addEnclos(position) {
    const sqlInsertEnclos = `INSERT INTO ENCLOS(position) VALUES ${position}`;
    db.run(sqlInsertEnclos, position, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) inserted ${this.changes}`);
    });
}

function fillEnclos() {
    enclos.forEach((pos) => {
        addEnclos(pos.x + ";" + pos.y);
    })
}
/*
//Erreur : SQLITE_ERROR: near "50": syntax error SQLITE_ERROR: near "150": syntax error
//A corriger !
fillEnclos(enclos);*/
