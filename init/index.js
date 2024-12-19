const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://05vikashdubey:XVy8gImgnCb0cSPN@cluster0.vd51r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

