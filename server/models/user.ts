import mongoose, { PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
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

UserSchema.plugin(passportLocalMongoose, {
  usernameQueryFields: ['username', 'email']
});

const Model = mongoose.model('User', UserSchema as PassportLocalSchema);

declare global {
  export type UserDocument = mongoose.Document & {
      _id: String,
      username: String,
      email: String,
      display: String
  }
}
export default Model;