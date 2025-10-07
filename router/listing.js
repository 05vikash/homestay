const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const ListingControllers=require("../controller/listing.js")
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// get route
router.route("/")
.get( wrapAsync(ListingControllers.index))
.post(isLoggedIn,
upload.single('listing[image]'), 
validateListing,
wrapAsync (ListingControllers.createListing));


  
 //get new route 
router.get("/new",isLoggedIn,ListingControllers.renderNewForm);

 
  
  //show route 
  router.get("/:id", wrapAsync(ListingControllers.showListing));

   
  
 
  //get edit route 
  router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingControllers.editListing));
  
  //update route
  router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(ListingControllers.updateListing));
  
  //delete route
  router.delete("/:id",isLoggedIn,isOwner, wrapAsync(ListingControllers.deleteListing));



  module.exports=router;