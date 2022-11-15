const express = require('express')
const app = new express();
const path = require('path');
app.use(express.static('./dist/Frontend'));
    



app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors')
require('./middleware/mongodb')
app.use(cors())
const logger=require('morgan')
app.use(logger('dev'))
const api = require('./routes/api')
app.use('/api',api)
const DATA = require('./models/blog');
app.post('/api/blog',async(req,res)=>{
    try{
       console.log(req.body)
       let item =req.body;
       const newblog = new DATA(item)
       const saveblog = await newblog.save()
       res.send(saveblog)
   
   }catch(error){
       console.log("error")
   }
   })


   app.get('/api/blogdetails',async(req,res)=>{
    try{
        const list = await DATA.find()
        res.send(list)
    }
    catch(error){
        
            console.log(error)
        }
    }
)
app.get('/api/assets/images/cakes.jpg',(req,res)=>{
    console.log(req.files);
})
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
   });

app.listen(3000,()=>{
    console.log("Server is listening to port 3000")
})
    
