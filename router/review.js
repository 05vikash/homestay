const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const{isLoggedIn, isReviewAuthor,validateReview}=require("../middleware.js");
const reviewController=require("../controller/review.js")



// create review route 
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
  
  // delete review route 
  router.delete("/:reviewId",isReviewAuthor, wrapAsync(reviewController.deleteReview));


module.exports=router;