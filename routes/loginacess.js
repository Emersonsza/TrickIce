import express from 'express';
import db from '../database.js';
const route = express.Router()

async function cadastrar(req, res) {
    const {nome,email,senha} = req.body
    const nameresult =await db.query("insert into usuarios(nome, email, senha) values(?, ?, ?)",[nome, email, senha])
    if (nameresult[0].affectedRows < 0) {
        res.status(400).json({messenger: 'Não foi possível cadastrar'})
    } else{
        res.status(200).json({messenger: 'Cadastrado com sucesso'})
    }
}

route.post("/usuario", cadastrar)
export default route