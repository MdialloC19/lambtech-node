import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  studentNumber: {
    type: String,
    required: [true, "Please give the student card number"],
    unique: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now(),
  },
  studentStatus: {
    type: String,
    enum: ["EXPELLED", "SUSPENDED", "AUTHORIZED"],
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

StudentSchema.pre("find", skipDeleted);
StudentSchema.pre("findOne", skipDeleted);
StudentSchema.pre("findById", skipDeleted);
StudentSchema.pre("updateOne", skipDeleted);
StudentSchema.pre("updateMany", skipDeleted);
StudentSchema.pre("findOneAndUpdate", skipDeleted);
StudentSchema.pre("deleteOne", skipDeleted);
StudentSchema.pre("deleteMany", skipDeleted);
const Student = mongoose.model("student", StudentSchema);
export default Student;
