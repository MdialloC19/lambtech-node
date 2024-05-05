import mongoose from "mongoose";

const EvaluationSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: true,
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "matiere",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  noteTP: {
    type: Number,
  },
  noteCC: {
    type: Number,
  },
  noteDS: {
    type: Number,
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

EvaluationSchema.pre("find", skipDeleted);
EvaluationSchema.pre("findOne", skipDeleted);
EvaluationSchema.pre("findById", skipDeleted);
EvaluationSchema.pre("updateOne", skipDeleted);
EvaluationSchema.pre("updateMany", skipDeleted);
EvaluationSchema.pre("findOneAndUpdate", skipDeleted);
EvaluationSchema.pre("deleteOne", skipDeleted);
EvaluationSchema.pre("deleteMany", skipDeleted);
const Evaluation = mongoose.model("evaluation", EvaluationSchema);
export default Evaluation;
