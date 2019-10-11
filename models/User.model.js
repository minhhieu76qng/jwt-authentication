const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    token: String
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
