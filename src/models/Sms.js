import mongoose from "mongoose";

const SMSSchema = new mongoose.Schema({
  intitule: {
    type: String,
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  idReceiver: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence à un utilisateur
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const SMS = mongoose.model("SMS", SMSSchema);

export default SMS;
