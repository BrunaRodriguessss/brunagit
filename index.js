const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

const dotenv=require('dotenv')


if(process.env.OMG === "DEV"){
    dotenv.config({path:'./config/.env.dev'})
}
if(process.env.OMG === "PROD"){
    dotenv.config({path:'./config/.env.prod'})
}


const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String
}))

const modelodeResenha = mongoose.model('resenhas', new mongoose.Schema({
    texto: String
}))

mongoose.connect('mongodb://127.0.0.1:27017/hehe') // process.env.URL
 .then(()=>{
app.post('/get/', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, password: req.body.password})
    if(usuarioEncontrado === null){
       return res.send("eita, essa conta não exite")
    }
    console.log(usuarioEncontrado);
    res.send(usuarioEncontrado)
})
  
app.post('/post',async (req,res) =>{
    const usuarioCriado = await modelodeUsuario.create({email: req.body.email, password: req.body.password})
    res.send(usuarioCriado)
})

app.put('/put', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send({ message: "dados atualizados com sucesso!" })
})
  
app.delete('/delete', async (req,res)=>{
    const usuarioDeletado = await modelodeUsuario.deleteOne({email: req.body.email, password: req.body.password})
    res.send(usuarioDeletado)
})  

app.post('/getResenhas/', async (req,res)=>{
    const resenhaEncontrada = await modelodeResenha.findOne({texto: req.body.texto})
    if(resenhaEncontrada === null){
       return res.send("eita, essa resenha não exite")
    }
    res.send(resenhaEncontrada)
})
  
app.post('/postResenhas',async (req,res) =>{
    const resenhaCriada = await modelodeResenha.create({texto: req.body.texto})
    res.send(resenhaCriada)
})

app.put('/putResenhas', async (req,res)=>{
    const resenhaAtualizada = await modelodeResenha.findOneAndUpdate({texto: req.body.texto}, {resenha: req.body.newResenha})
    res.send({ message: "resenha atualizada com sucesso!" })
})
  
app.delete('/deleteResenhas', async (req,res)=>{
    const resenhaDeletada = await modelodeResenha.deleteOne({texto: req.body.texto})
    res.send(resenhaDeletada)
})  

app.use((req,res)=>{
    res.send('Não foi possível encontrar sua rota')
})

app.listen(2800, ()=>console.log(`o servidor ta rodando, é nessa porta aqui ó: ${2800}`))

})