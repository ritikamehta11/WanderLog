const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname : {type:String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true }, // New field for age
  phoneNumber: { type: String, required: true, unique: true }, // New field for phone number
});

module.exports = mongoose.model("User", UserSchema);
