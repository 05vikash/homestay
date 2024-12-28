const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require('../utils/ExpressError.js');
const {reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js")





const validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)
    if(error){
      throw new ExpressError(400,error.error);
    } 
    else{
      next();
    }
  }



// create review route 
router.post("/",validateReview,wrapAsync( async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newreview= new Review(req.body.review);
    listing.review.push(newreview);
     await newreview.save();
     await listing.save();
     req.flash("success","review created");
    res.redirect(`/listing/${listing._id}`);
  
  }));
  
  // delete review route 
  router.delete("/:reviewId", wrapAsync(async(req,res)=>{
   let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}} );
   await Review.findByIdAndDelete(reviewId);
   req.flash("success","review deleted");
   res.redirect(`/listing/${id}`);
   
  }));


module.exports=router;