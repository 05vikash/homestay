const express =require('express')
const app=express();
const mongoose = require("mongoose");
const path=require('path');
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require('./utils/ExpressError.js');
const listings=require("./router/listing.js")
const reviews=require("./router/review.js")
const user=require("./router/user.js");
const session=require("express-session");
const Listing = require('./models/listing.js');


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dburl = "mongodb+srv://05vikashdubey:XVy8gImgnCb0cSPN@cluster0.vd51r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialised:true
};

// app.use(session(sessionOption));

app.use("/",user);
app.use("/listing",listings);
app.use("/listings/:id/reviews",reviews);


// global error
app.all("*",async(req,res,next)=>{
  const allListings=await Listing.find({});
  res.render("listings/index.ejs",{allListings});
});

app.use((err,req,res,next)=>{
  let {statuscode,message,stack}=err;
  res.status(400).render("error.ejs",{stack});
  // res.status(statuscode).send(message);
});



app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
