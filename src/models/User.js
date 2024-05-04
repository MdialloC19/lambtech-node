import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please give the name"],
  },
  email: {
    type: String,
    required: [true, "Please give the email"],
    unique: true,
    trim: true,
    // match: /^\S+@\S+\.\S+$/, // Regex for a simple email validation
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

UserSchema.pre("find", skipDeleted);
UserSchema.pre("findOne", skipDeleted);
UserSchema.pre("findById", skipDeleted);
UserSchema.pre("updateOne", skipDeleted);
UserSchema.pre("updateMany", skipDeleted);
UserSchema.pre("findOneAndUpdate", skipDeleted);
UserSchema.pre("deleteOne", skipDeleted);
UserSchema.pre("deleteMany", skipDeleted);

const User = mongoose.model("user", UserSchema);
export default User;
