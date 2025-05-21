// const mongoose = require('mongoose');

// const mongoURI= "mongodb://localhost:27017/inotebook"


// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("Connected to MongoDB successfully!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// module.exports = connectToMongo;

// backend/db.js
require('dotenv').config();           // ← load .env
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    // exit if we can’t connect
    process.exit(1);
  }
};

module.exports = connectToMongo;
