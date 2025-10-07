const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newreview= new Review(req.body.review);
    newreview.author=req.user._id;
    listing.review.push(newreview);
     await newreview.save();
     await listing.save();
     req.flash("success","review created");
    res.redirect(`/listing/${listing._id}`);
  
  }

  module.exports.deleteReview=async(req,res)=>{
   let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}} );
   await Review.findByIdAndDelete(reviewId);
   req.flash("success","review deleted");
   res.redirect(`/listing/${id}`);
   
  }