const express = require('express')
const app = express()
const engine = require('express-handlebars').engine
const db = require('./model/connection')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


//default page
app.get("/",(req,res)=>{
    res.render('home')
})


//Show User
app.get("/showuser",(req,res) =>{
    let sql = "SELECT * FROM `employee`"
    db.query(sql,(err,result) =>{
        if(err) throw err
        else
        res.render('show',{list:result})
    })
})

//show user by email which is a primary key 
app.get("/showuser/email",(req,res) =>{
    let sql = `SELECT *from employee = '${req.params.email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else 
        res.json(result)
    })
})

//Add user
app.post("/adduser",(req,res) =>{
    console.log(req.body)
    const user = {name:req.body.name,email:req.body.email,phone:req.body.phone,city:req.body.city}
    let sql = "INSERT INTO `employee` SET ?"
db.query(sql,user,(err,result)=>{
    if(err) throw err 
    else
    res.redirect('/getData')
})
}) 

//Delete User
app.delete("/deleteuser/:email",(req,res) =>{
let sql = `DELETE FROM employee where email = '${req.params.email}'`
db.query(sql,(err,result)=>{
if(err) throw err
else
res.json(result)
})
})

//Update user

app.put("/updateUser/:email",(req,res) =>{
    let email = req.params.email
    const name = req.body.name
    const phone = req.body.phone;
    const city = req.body.city
    let sql = `UPDATE employee SET name='${name}',phone='${phone}',city='${city}'`
    db.query(sql,(err,result) =>{
        if(err) console.log(err)
        else
        res.json(result)
    })
})

 const PORT = process.env.PORT || 7000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))