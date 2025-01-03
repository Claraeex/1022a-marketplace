import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.get("/produtos", async(req,res)=>{
    //OK -> 0 - Criar o banco de dados e iniciar o servidor de banco.
    //1 - Criar a conexão com o banco
    try{
        const connection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        //2 - Realizar uma consulta na tabela
        const [result, fields] = await connection.query("SELECT * from produtos")
        await connection.end()
        //3 - Devolver os dados pra quem pediu
        res.send(result)
    }catch(e){
        res.status(500).send("Server ERROR")
    }
})

app.post("/produtos", async(req,res)=>{
    //OK -> 0 - Criar o banco de dados e iniciar o servidor de banco.
    //1 - Criar a conexão com o banco
    try{
        const connection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        //2 - Realizar uma consulta na tabela
        const {id,nome,descricao,preco,imagem} = req.body
        const [result, fields] = await connection.query("INSERT INTO from produtos VALUES(?,?,?,?,?)", [id,nome,descricao,preco,imagem])
        await connection.end()
        //3 - Devolver os dados pra quem pediu
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

app.get("/usuarios", async(req,res)=>{
    //OK -> 0 - Criar o banco de dados e iniciar o servidor de banco.
    //1 - Criar a conexão com o banco
    try{
        const conection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        //2 - Realizar uma consulta na tabela
        const [result, fields] = await conection.query("SELECT * from usuarios")
        await conection.end()
        //3 - Devolver os dados pra quem pediu
        res.send(result)
    }catch(e){
        res.status(500).send("Server ERROR")
    }
})

app.listen(8000,()=>{
    console.log("Iniciei o servidor")
})