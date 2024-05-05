import mongoose from "mongoose";

const UniteEnseignementSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Please give the code UE"],
    unique: true,
  },
  credit: {
    type: Number,
    required: [true, "Please give the credit UE"],
  },
  intitule: {
    type: String,
    required: [true, "Please give the intitule UE"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

UniteEnseignementSchema.pre("find", skipDeleted);
UniteEnseignementSchema.pre("findOne", skipDeleted);
UniteEnseignementSchema.pre("findById", skipDeleted);
UniteEnseignementSchema.pre("updateOne", skipDeleted);
UniteEnseignementSchema.pre("updateMany", skipDeleted);
UniteEnseignementSchema.pre("findOneAndUpdate", skipDeleted);
UniteEnseignementSchema.pre("deleteOne", skipDeleted);
UniteEnseignementSchema.pre("deleteMany", skipDeleted);

const UniteEnseignement = mongoose.model(
  "uniteEnseignement",
  UniteEnseignementSchema
);
export default UniteEnseignement;
