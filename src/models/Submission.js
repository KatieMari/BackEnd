// Import Mongoose to Define Schemas and Interact with MongoDB
import mongoose from "mongoose";

// Schema Defining the Structure of a Water Usage Submission - Each Document Represents One Calculation Made by a User
const submissionSchema = new mongoose.Schema({
  // Time Stamp Automatically Added when a Submission is Created
  createdAt: { type: Date, default: Date.now },

  showersPerWeek: Number,
  avgShowerMinutes: Number,
  laundryLoadsPerWeek: Number,
  diet: String,
  totalLitresPerDay: Number
});

// Creates a Mongoose Model Based on the Schema
// This Provides Methods for Creating , Reading, and Storing Submissions in the MongoDB Database
const Submission = mongoose.model("Submission", submissionSchema);

// Export the Model so it can be used in Route Handlers
export default Submission;
