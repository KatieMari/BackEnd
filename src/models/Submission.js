import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  showersPerWeek: Number,
  avgShowerMinutes: Number,
  laundryLoadsPerWeek: Number,
  diet: String,
  totalLitresPerDay: Number
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
