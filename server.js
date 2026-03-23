import express from 'express';
import usuario from "./routes/loginacess.js"
const app = express ()
app.use(express.json())
app.use(usuario)

app.listen(3000,() =>{
    console.log('tá rodando')
})