if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./router/listing.js");
const reviews = require("./router/review.js");
const users = require("./router/user.js");
const Listing = require("./models/listing.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dburl="mongodb://127.0.0.1:27017/wanderlust";


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

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));



app.use(session({
  secret: 'mysupersecretcode', // Replace with your own secret key
  resave: false,             // Do not save the session if it was not modified
  saveUninitialized: true,  // Do not create session until something is stored
  cookie: { 
    maxAge: 600000,           // 1 minute (adjust as needed)
    httpOnly: true          // Secure the cookie
  }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser=req.user;
  next();
});

app.use("/", users);
app.use("/listing", listings);
app.use("/listings/:id/reviews", reviews);

// Global error handler for invalid routes
app.all("*", async (req, res, next) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// General error handler
app.use((err, req, res, next) => {
  const { stack } = err;
  res.status(400).render("error.ejs", { stack });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
