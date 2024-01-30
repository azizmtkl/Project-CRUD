const express = require("express");
const app = express();
const port = 7474;
const mongoose = require("mongoose");
const path = require('path')
const Customer = require("./models/CustomerShema");
const moment = require("moment")
var methodOverride = require('method-override')
const cors = require('cors')

app.use(cors()); 


app.set("view engine" , "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})) 
app.use(methodOverride('_method'))




mongoose.set('strictQuery', true);

const connect_DB = ()=>{
    try{
 mongoose.connect("mongodb+srv://azizmtkl7:MT0lR81GeDviBXIr@cluster0.bjlawtm.mongodb.net/CRUD-data?retryWrites=true&w=majority", )

        
    } catch(err){
         res.status(500).json("error to connect to database")
    }
}





app.listen(port , ()=>{
    console.log(`listening to : http://localhost:${port}`)
    try{
        connect_DB()
        console.log("connect to database !!")
    } catch(err){
        res.status(500).json("error to connect to db ")
    }
})

//   Get Home page 56   ---------------------

app.get("/" ,(req,res)=>{

    Customer.find().then((result)=>{
    res.render("index", {arr : result , moment: moment}) 
    }).catch((err)=>{
        console.log(err)
    });

})

app.get("/add",(req, res)=>{
    res.render("add")
})



// Add Customer =======================
app.post("/add",(req, res)=>{

    Customer.create(req.body)
    .then(()=>{console.log("created succesful;"), res.redirect("/add")})
    .catch((err)=>{
        console.log(err)
    })

})




// view a customer ==============================
app.get("/user/:id",(req, res)=>{

    Customer.findById(req.params.id).then((result)=>{
        console.log(result)
        res.render("user/view", {obj : result});

    }).catch((err)=>{
        console.log(err)
    });
    // console.log(req.params.id)
})




app.get("/edit/:id",(req, res)=>{
     
    Customer.findById(req.params.id)
    .then((result)=>{

        res.render("edit" , {obj :result})

    }).catch((err)=>{
        console.log(err)
    })
    // console.log(err)
})

app.post("/edit/:id " , async (req, res,next)=>{
    try{

        await Customer.updateOne({_id: req.params.id}, req.body)
        res.redirect("/")
    }
    catch(err){
        res.status(500).json(err)
    }

})

 