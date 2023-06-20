const express=require('express');
const ShortUrl =require('./models/shortUrl');
const mongoose = require("mongoose");

const DB = "mongodb+srv://chdvanshsingh:chdvanshsingh@cluster0.fk3cdjc.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery" , true);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=> console.log(err));



const app=express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(express.urlencoded({extended : true}));
app.use(express.json());

// app.get('/',async(req,res)=>{
//     const shortUrls=ShortUrl.findOne({full : req.body.fullUrl})
//     res.render('index',{shortUrls: shortUrls})
// })

app.post('/shortUrls',async (req,res)=>{
    console.log("post hit");
    try{
    const temp=await ShortUrl.findOne({full : req.body.fullUrl});
    if(temp!=null)
    {
        const data={'short': temp.short};
        res.status(200).send(data);
    }
    else
    {
        const response=await ShortUrl.create({full: req.body.fullUrl, notes: req.body.note});
        const data={'short': response.short};
        res.status(200).send(data);
    }
    }
    catch (error){
        console.log(error);
    }
    // console.log(req.body);
})

app.post('/searchUrls',async (req,res)=>{
    console.log("post hit 3");
    try{
    const temp=await ShortUrl.findOne({notes: req.body.searchedNote});
    if(temp!=null)
    {
        const data={'full': temp.full,'short' : temp.short};
        res.status(200).send(data);
    }
    else
    {
        res.send({'Nothing Found': 'Nothing Found'});
    }
    }
    catch (error){
        console.log(error);
    }
    // console.log(req.body);
})
app.listen(process.env.PORT || 5000);