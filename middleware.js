const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const {reviewSchema,listingSchema}=require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.validateListing=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body)
    if(error){
      throw new ExpressError(400,error.error);
    } 
    else{
      next();
    }
  }
module.exports.validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)
    if(error){
      throw new ExpressError(400,error.message);
    } 
    else{
      next();
    }
  }

module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req);
    if(!req.isAuthenticated()){
        req.session.savedUrl=req.originalUrl;
        req.flash("error","you must be logged in ");
        return res.redirect("/login");
    }
    next();
}




module.exports.savedUrl=(req,res,next)=>{
    if(req.session.savedUrl){
        res.locals.savedUrl=req.session.savedUrl;
    }
    next();
}



module.exports.isOwner=async (req,res,next)=>{
    let{id}=req.params;
    let listing= await Listing.findById(id);
    console.log(listing);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
        
    }
    next();
}

module.exports.isReviewAuthor=async (req,res,next)=>{
    let{id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser.id)){
        req.flash("error","you are not the author of this review");
        return res.redirect(`/listing/${id}`);
 }
 next();

}