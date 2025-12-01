require('dotenv').config();
const express=require("express");
const path = require('path');
const mongoose=require("mongoose");
const User=require("./modules/users");
const session=require('express-session');
const MongoStore=require("connect-mongo");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const listRoute=require('./routers/listroute');
const reviewRoute=require('./routers/reviewroute');
const userRoute=require('./routers/userroute');

const cors=require('cors')


const main =async()=>{ mongoose.connect(process.env.database_Url);}
  main()
  .then(() => console.log('db Connected!'))
  .catch((err)=>{
    console.log(err)
  });

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

const store=MongoStore.create({
  mongoUrl:process.env.database_Url,
  crypto:{
    secret:process.env.secret
  },
  touchAfter:24*3600,
})
store.on("error",()=>{
  console.log("mongo session error",err)
})
app.use(session({
  store,
  secret:process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge:7*24*3600*1000,
    httpOnly:true,
    // secure:true
  }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',(req,res)=>{
  res.send("hello world")
})

app.use('/api/list',listRoute)//multipart
app.use('/api/',userRoute)// json
app.use('/api/list/:id/review',reviewRoute)//json


app.use(express.static(path.join(__dirname, '../fron', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../fron', 'dist', 'index.html'));
});


app.all("*",(req,res)=>{
  res.status(404).send("page not found.")
})
app.use((err,req,res,next)=>{
  const {status=500,message="something went wrong."}=err;
  res.status(status).json(message);
})
app.listen(process.env.port || 3000,()=>{
    console.log(`server listening on ${process.env.port || 3000}..`);
})