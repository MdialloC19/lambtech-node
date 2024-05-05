import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

export default mongoose.model("Admin", AdminSchema);
