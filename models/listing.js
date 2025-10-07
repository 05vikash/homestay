const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  review:[{
    type:Schema.Types.ObjectId,
    ref:"Review",
  },],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  geometry:{
    type:String,
    enum:["point"],
    required:true,
  },
  coordinates:{
    type:[Number],
    required:true,
  },
  // category:{
  //   type:String,
  //   enum:["mountains","farms","castle","arctic"],
  //   required:true,
  // },
});



listingSchema.post("findOneAndDelete", async(listing)=>{
      await Review.deleteMany({_id:{$in:listing.review}});
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
