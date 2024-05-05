import mongoose from "mongoose";

const PointageSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "matiere",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
});

const Pointage = mongoose.model("pointage", PointageSchema);
export default Pointage;
