import mongoose from "mongoose";

const FormationSchema = new mongoose.Schema({
  codeFormation: {
    type: String,
    required: [true, "Please give the code Formation"],
    unique: true,
  },
  nameFormation: {
    type: String,
    required: [true, "Please give the name Formation"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

FormationSchema.pre("find", skipDeleted);
FormationSchema.pre("findOne", skipDeleted);
FormationSchema.pre("findById", skipDeleted);
FormationSchema.pre("updateOne", skipDeleted);
FormationSchema.pre("updateMany", skipDeleted);
FormationSchema.pre("findOneAndUpdate", skipDeleted);
FormationSchema.pre("deleteOne", skipDeleted);
FormationSchema.pre("deleteMany", skipDeleted);
const Formation = mongoose.model("formation", FormationSchema);
export default Formation;
