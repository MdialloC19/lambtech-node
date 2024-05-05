import mongoose from "mongoose";

const PresenceStudentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "matiere",
    required: true,
  },
  presence: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

PresenceStudentSchema.pre("find", skipDeleted);
PresenceStudentSchema.pre("findOne", skipDeleted);
PresenceStudentSchema.pre("findById", skipDeleted);
PresenceStudentSchema.pre("updateOne", skipDeleted);
PresenceStudentSchema.pre("updateMany", skipDeleted);
PresenceStudentSchema.pre("findOneAndUpdate", skipDeleted);
PresenceStudentSchema.pre("deleteOne", skipDeleted);
PresenceStudentSchema.pre("deleteMany", skipDeleted);

const PresenceStudent = mongoose.model(
  "presenceStudent",
  PresenceStudentSchema
);
export default PresenceStudent;
