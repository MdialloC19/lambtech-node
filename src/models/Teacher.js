import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  rank: { type: String },
  hiringDate: { type: Date },
  qualification: { type: [String] },
  experienceYears: { type: Number },
  salary: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false }, // use this to tell if he's fired or not
  schedule: [
    {
      dayOfWeek: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      startTime: { type: String, required: true }, // Heure de début (format HH:MM)
      endTime: { type: String, required: true }, // Heure de fin (format HH:MM)
    },
  ],
});

const Teacher = mongoose.model("teacher", TeacherSchema);
export default Teacher;
