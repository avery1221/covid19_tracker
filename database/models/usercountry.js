const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
  username: { type: String, unique: false, required: false },
  defaultCountry: { type: String, unique: false, required: false },
});

const UserCountry = mongoose.model("UserCountry", userSchema);
module.exports = UserCountry;
