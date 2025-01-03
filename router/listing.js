const express=require("express");
const router=express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema,reviewSchema}=require("../schema.js");
const {isLoggedIn}=require("../middleware.js");












const validateListing=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body)
    if(error){
      throw new ExpressError(400,error.error);
    } 
    else{
      next();
    }
  }
// get route

router.get("/", wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
  }));
  
  
  //
  router.get("/new",isLoggedIn,(req,res)=>{
   
      res.render("listings/new.ejs");
    
   
  });

 
  
  //show route 
  router.get("/:id", wrapAsync(async (req,res)=>{ 
    let {id}=req.params;
    const listing= await Listing.findById(id).populate("review");
    if(!listing){
      req.flash("error","listing not found");
      res.redirect("/listing");
    }

    res.render("listings/show.ejs",{listing});
  }));
  
  router.post("/",validateListing, wrapAsync (async(req,res,next)=>{
      
      let newpst= new Listing(req.body.listing) ;
      await newpst.save();
      req.flash("success","new listing created");
       res.redirect("/listing");
      }));
  
  //create route 
  
  router.get("/:id/edit", wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
      req.flash("error","listing not found");
      res.redirect("/listing");
    }
    
    res.render("listings/edit.ejs", { listing });
  }));
  
  //update route
  
  router.put("/:id",validateListing, wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Successfully updated");
    res.redirect("/listing");
  }));
  
  //delete route
  
  router.delete("/:id", wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const del= await Listing.findByIdAndDelete(id);
    req.flash("success","deleted successfully");
    res.redirect("/listing");
  }));



  module.exports=router;