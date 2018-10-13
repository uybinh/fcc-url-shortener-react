require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

// Use Class
//

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    return mongoose
      .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true }
      )
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }
}

// Use IIFE
//
// const Database = (function() {
//   return {
//     connect() {
//       mongoose
//         .connect(
//           process.env.MONGO_URI,
//           { useNewUrlParser: true }
//         )
//         .then(() => {
//           console.log("Database connection successful");
//         })
//         .catch(err => {
//           console.error("Database connection error");
//         });
//     }
//   };
// })();

// Use Constructor Function
//
// function Database() {
//   // const this = Object.create(Database.prototype)
//   this._connect();
//   // return this
// }

// Database.prototype._connect = () => {
//   mongoose
//     .connect(
//       process.env.MONGO_URI,
//       { useNewUrlParser: true }
//     )
//     .then(() => {
//       console.log("Database connection successful");
//     })
//     .catch(err => {
//       console.error("Database connection error");
//     });
// };

module.exports = new Database();
