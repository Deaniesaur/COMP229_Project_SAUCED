import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for the Mongoose Schema


const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    username: String,
    created: {
      type: Date,
      default: Date.now(),
    },
    updated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "users",
  }
);
const Model = mongoose.model("User", UserSchema);

export default Model;