/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import sqlite3  from "sqlite3";
import db from "./db.js";

sqlite3.verbose()

//==== ADMIN
const ADMIN_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ADMIN" (
"ID" INTEGER PRIMARY KEY AUTOINCREMENT,
"NOME" varchar(64),
"SOBRENOME" varchar(64),
"EMAIL" varchar(64),
"SENHA" varchar(64)
)`

const ADD_ADMIN_DATA = `
INSERT INTO ADMIN (NOME, SOBRENOME, EMAIL, SENHA)
VALUES
    ('Danilo', 'Santos', 'danilo@gmail.com', '************'),
    ('Rayssa', 'Cadilhe', 'rayssa@gmail.com', '***********')
`

function criaTabelaAdmin() {
    db.run(ADMIN_SCHEMA, (error) => {
        if (error) console.log ('Erro ao criar a tabela de Admin');
    });
};

function populaTabelaAdmin() {
    db.run(ADD_ADMIN_DATA, (error)=> {
        if (error) console.log(error);
     });
};

db.serialize( ()=> {
    criaTabelaAdmin();
    populaTabelaAdmin();
});