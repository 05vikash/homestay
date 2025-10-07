const Listing=require("../models/listing");



module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
  }


  module.exports.renderNewForm=(req,res)=>{
   
      res.render("listings/new.ejs");
    
   
  }

  module.exports.showListing=async (req,res)=>{ 
    let {id}=req.params;
    const listing= await Listing
    .findById(id)
    .populate({path:"review",populate:{path:"author"}})
    .populate("owner");
    if(!listing){
      req.flash("error","listing not found");
      res.redirect("/listing");
    }

    res.render("listings/show.ejs",{listing});
  }

  module.exports.createListing=async(req,res,next)=>{
     let url= req.file.path;
     let filename=req.file.filename;
     
      let newpst= new Listing(req.body.listing) ;
      newpst.owner=req.user._id;
      newpst.image={url,filename};
      await newpst.save();
      req.flash("success","new listing created");
       res.redirect("/listing");
      }

 module.exports.editListing=async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
      req.flash("error","listing not found");
      res.redirect("/listing");
    }
    
    res.render("listings/edit.ejs", { listing });
  }

  module.exports.updateListing=async (req,res)=>{
      let {id}=req.params;
     let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
      if(req.file){
        listing.image.url=req.file.path;
        listing.image.filename=req.file.filename;
        
      }
      await listing.save();
      req.flash("success","Successfully updated");
      res.redirect("/listing");
    }

module.exports.deleteListing=async (req,res)=>{
    let{id}=req.params;
    const del= await Listing.findByIdAndDelete(id);
    req.flash("success","deleted successfully");
    res.redirect("/listing");
  };