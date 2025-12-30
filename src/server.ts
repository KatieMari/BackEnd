// Import Express and TypeScript Types for Request/Responce Handling
import express, { Request, Response } from "express";
// Middleware to Allow Cross-Origin Requests from the Frontend
import cors from "cors";
// Middleware to Parse Incoming Request Bodies
import bodyParser from "body-parser";
// Import the Calculator API Route
import calculateRoute from "./routes/calculate";

// Create the Express Application Instance
const app = express();
// Define the Port the Server will Listen on
const port = 3000;

// Configure CORS to Allow Requests from any Origin
// This Enables Communication Between the Frontend and Backend
const corsOptions = {
  origin: "*",
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Enable Parsing of JSON Request Bodies - Required for Handling POST Requests with JSON Data
app.use(bodyParser.json());

// Enable Parsing of URL-Encoded Request Bodies (e.g. Form Submission)
app.use(bodyParser.urlencoded({ extended: false }));

// Simple Test Route to Confirm the Server is Running
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

// API Route for Water FootPrint Calculations - Delegates Calculation Logic to a Seperate Route File
app.use("/api/calculate", calculateRoute);

// Start the Server and Listen for Incoming Requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
