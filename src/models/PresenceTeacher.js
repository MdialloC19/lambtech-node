import mongoose from "mongoose";

const PresenceTeacherSchema = new mongoose.Schema({
  teacher: {
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

PresenceTeacherSchema.pre("find", skipDeleted);
PresenceTeacherSchema.pre("findOne", skipDeleted);
PresenceTeacherSchema.pre("findById", skipDeleted);
PresenceTeacherSchema.pre("updateOne", skipDeleted);
PresenceTeacherSchema.pre("updateMany", skipDeleted);
PresenceTeacherSchema.pre("findOneAndUpdate", skipDeleted);
PresenceTeacherSchema.pre("deleteOne", skipDeleted);
PresenceTeacherSchema.pre("deleteMany", skipDeleted);

const PresenceTeacher = mongoose.model(
  "presenceTeacher",
  PresenceTeacherSchema
);
export default PresenceTeacher;
