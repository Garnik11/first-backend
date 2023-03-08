const express = require("express")
const sqlite = require("sqlite3").verbose()
const app = express()
const port = 3001
const cors = require('cors')
app.use(express.json())
app.use(cors())

const db = new sqlite.Database('database.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM scates', [], (error, data) => {
        res.send(data)
    })
})

app.get('/scates/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    db.get('SELECT * FROM scates WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
   
})

app.post('/new', (req,res) => {
    
    const img = req.body.img
    const brand = req.body.brand
    const about = req.body.about
    const name = req.body.name
    const oldprice = req.body.oldprice
    const newprice = req.body.newprice

    db.run('INSERT INTO scates (img, brand, about, name, oldprice, newprice) values (?,?,?,?,?,?)', [img, brand, about, name, oldprice, newprice],(err) => {
        res.send("OOKKK")
    })
})

app.delete('/delete/:id', (req,res) => {
    
    const id = req.params.id

    db.run('DELETE FROM scates WHERE id=?;)', [id],(err) => {
        res.send("OOKKK")
    })
})

app.put("/update/:id", (req, res)=>{
    const img = req.body.img
    const brand = req.body.brand
    const about = req.body.about
    const name = req.body.name
    const oldprice = req.body.oldprice
    const newprice = req.body.newprice
    const id = req.params.id
    db.run("update scates set img=?, brand=?, about=?, name=?, oldprice=?, newprice=? where id=?",[img, brand, about, name, oldprice, newprice,id], (err)=>{
        res.send("OK")
    })
})

app.listen(port)
