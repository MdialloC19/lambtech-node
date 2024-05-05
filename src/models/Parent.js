import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

export default mongoose.model("Parent", ParentSchema);
