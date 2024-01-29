const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;
app.use(express.static("public"));

//------------------------------------------------------------------------------------------------
// MONGOOSE CONNECTION

mongoose.connect('mongodb://localhost:27017/locateMyLostDB' ,{ useNewUrlParser : true});



//------------------------------------------------------------------------------------------------

// LOST SCHEMA
const lostItemSchema = new mongoose.Schema({
    username : String,
    Phonenumber : Number ,
    lostItem : String,
    key : String,
});

// USING LOST SCHEMA 
const LostItem = mongoose.model('lostItem',lostItemSchema);

const demoLostItem = new LostItem ({
    username : "Harshit Dubey",
    Phonenumber : 1234567890,
    lostItem : "Calculator",
    key : "1:- Date of lost , 2:- model of calculator , 3:- another information",
});


app.get('/lostdata',(req, res)=>{
    // res.render('lostitem',{losts : losts});

    LostItem.find({})
    .then(lostItems => {
        if(lostItems.length === 0){
            LostItem.insertMany(demoLostItem)
        .then(() => {
          console.log('Successfully Saved all the default items to DB');
        })
        .catch((err) => {
          console.error(err);
        });
        res.redirect("/lostData");
        }
        else{
            res.render('lostitem',{losts : lostItems});
            res.redirect('/lostData');
        }
    })
    .catch(err => {
        console.error(err);
    });
});

// ADDING DATA TO DATABASE 

app.post('/lostdata' , (req , res)=>{
    
    const lostusername = req.body.Username ;
    const lostPhonenumber = Number(req.body.Phone);
    const lostItem = req.body.lostItem ; 
    const lostKey = req.body.key  ;

    const item = new LostItem ({
        username : lostusername,
        Phonenumber : lostPhonenumber ,
        lostItem : lostItem,
        key : lostKey,
    })

    item.save();
    res.redirect('/');
});


//------------------------------------------------------------------------------------------------

// FOND SCHEMA
const foundItemSchema = new mongoose.Schema({
    username : String,
    Phonenumber : Number ,
    foundItem : String,
    foundkey : String,
});

// USING FOUND SCHEMA 
const FoundItem = mongoose.model('foundItem',foundItemSchema);

const demoFoundItem = new FoundItem({
    username : "Rishit Dubey",
    Phonenumber : 9876543210 ,
    foundItem : "Calulator",
    foundkey : "1:- Date of lost , 2:- model of calculator , 3:- another information",
});

app.get('/foundData',(req, res)=>{
    FoundItem.find({})
    .then(foundItems =>{
        if(foundItems.length === 0){
            FoundItem.insertMany(demoFoundItem)
        .then(()=>{
                console.log('Successfully Saved all the default items to DB');
            })   
        .catch((err)=>{
            console.log(err);
        });
        res.redirect('/')
        }
        else{
            res.render('founditem',{finds : foundItems});
            res.redirect('/')
        }
    })
    .catch((err)=>{
        console.log(err);
    });
});

// ADDING DATA TO DATA BASE FROM FORM
app.post('/foundData' , (req , res)=>{

    const username = req.body.foundUsername;
    const phonenumber = Number(req.body.foundPhone);
    const foundItem = req.body.foundItem;
    const foundkey = req.body.foundkey;

//         Fusername : req.body.foundUsername,
//         Fphonenumber : Number(req.body.foundPhone),
//         foundItem : req.body.foundItem,
//         foundkey : req.body.foundkey,

    const items = new FoundItem({
        username : username,
        Phonenumber : phonenumber ,
        foundItem : foundItem,
        foundkey : foundkey,
    })
    items.save();
    res.redirect('/');
});

//------------------------------------------------------------------------------------------------


app.get('/',(req , res)=>{
    res.sendFile(__dirname+'/Index.html');
});

// const Lkey = [];
// app.post('/lostdata' , (req , res)=>{
//     const lost = {
//         username : req.body.Username ,
//         Phonenumber : Number(req.body.Phone),
//         lostItem : req.body.lostItem,
//         key : req.body.key ,
//     };
//     // console.log(username , Phonenumber , lostItem ,key );
//     losts.push(lost);
//     res.redirect('/');
// });



// app.post('/foundData' , (req , res)=>{
//     const found = {
//         Fusername : req.body.foundUsername,
//         Fphonenumber : Number(req.body.foundPhone),
//         foundItem : req.body.foundItem,
//         foundkey : req.body.foundkey,
//     };
//     // console.log(Fusername , Fphonenumber , foundItem ,foundkey );
//     finds.push(found);
//     res.redirect('/');
// });


//------------------------------------------------------------------------------------------------


app.listen(port,()=>{
    console.log(`The Server is Running on Port ${port}`);
});
