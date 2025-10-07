const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    return initDB(); // Await the DB initialization after connection
  })
  .then(() => {
    console.log("data was initialized");
  })
  .catch((err) => {
    console.log(err);
  });
  
  async function main() {
    await mongoose.connect(MONGO_URL);
  }
  

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map(listing=>({...listing,owner:"67700984bb68a8c82f1eaaae"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

