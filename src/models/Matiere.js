import mongoose from "mongoose";

const matiereSchema = new mongoose.Schema({
  intitule: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  coefficient: {
    type: Number,
    required: true,
  },
  teacherFull: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: false,
  },
  teacherSecond: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: false,
  },
  unitedenseignement: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "unitedenseignement",
    },
  ],
});

const Matiere = mongoose.model("matiere", matiereSchema);

export default Matiere;
