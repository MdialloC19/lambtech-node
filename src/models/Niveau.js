import mongoose from "mongoose";

const NiveauSchema = new mongoose.Schema({
  codeNiveau: {
    type: String,
    required: [true, "Please give the code Niveau"],
    unique: true,
  },
  libelle: {
    type: String,
    required: [true, "Please give the libelle Niveau"],
  },
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "formation",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

NiveauSchema.pre("find", skipDeleted);
NiveauSchema.pre("findOne", skipDeleted);
NiveauSchema.pre("findById", skipDeleted);
NiveauSchema.pre("updateOne", skipDeleted);
NiveauSchema.pre("updateMany", skipDeleted);
NiveauSchema.pre("findOneAndUpdate", skipDeleted);
NiveauSchema.pre("deleteOne", skipDeleted);
NiveauSchema.pre("deleteMany", skipDeleted);

const Niveau = mongoose.model("niveau", NiveauSchema);
export default Niveau;
