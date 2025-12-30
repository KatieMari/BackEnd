// Import Express and TypeScript Types for Requests and Responce
import express, { Request, Response } from "express";

// Create a Router Instance for Calculation-Related Routes 
const router = express.Router();

// Allow Diet Types for Water FootPrint Calculations
type DietType = "plant-based" | "balanced" | "meat-heavy" | string;

// Expected Shape of the Request Body Sent from the Frontend
interface CalculateBody {
  showersPerWeek: number | string;
  avgShowerMinutes: number | string;
  laundryLoadsPerWeek: number | string;
  diet: DietType;
}

// Calculates a user's Estimated Daily Water Footprint based on Showering, Laundry Habits and Diet
function calculateFootprint(data: CalculateBody) {
  // Destructure Input Data from Request Body
  const {
    showersPerWeek,
    avgShowerMinutes,
    laundryLoadsPerWeek,
    diet,
  } = data;

  // Convert all Numeric Inputs to Numbers - Handles String Inputs
  const showers = Number(showersPerWeek);
  const minutes = Number(avgShowerMinutes);
  const laundry = Number(laundryLoadsPerWeek);

  // Constants Representing  Average Water Usage
  const LITERS_PER_MIN_SHOWER = 10;
  const LITERS_PER_LAUNDRY = 50;

  // Calculate Average Showers Per Day
  const showersPerDay = showers / 7;
  const showerLitres = showersPerDay * minutes * LITERS_PER_MIN_SHOWER;

  // Calculate Average Laundry Loads Per Day
  const laundryPerDay = laundry / 7;
  const laundryLitres = laundryPerDay * LITERS_PER_LAUNDRY;

  // Multipliers Representing the Water Impact of Different Diets
  const dietMultiplierMap: Record<string, number> = {
    "plant-based": 0.8,
    balanced: 1.0,
    "meat-heavy": 1.3,
  };

  // Select Diet Multiplier, Defaulting to 1.0 if Unknown
  const dietMultiplier = dietMultiplierMap[diet] ?? 1.0;

  // Calculate  Total Daily Water Usage and Round to Nearest Litre
  const total = Math.round((showerLitres + laundryLitres) * dietMultiplier);

  const advice: string[] = [];

  // Shower Usage Feedback
  if (showerLitres > 80) {
    advice.push("Try shorter showers to reduce water use.");
  } else {
    advice.push("Your shower usage looks reasonable.");
  }

  // Diet Related Feedback
  if (diet === "meat-heavy") {
    advice.push("Reducing meat intake slightly can lower your water footprint.");
  } else {
    advice.push("Your diet has a moderate water impact.");
  }

  // Return Calculation Results to the API Route
  return {
    totalLitresPerDay: total,
    breakdown: { showerLitres, laundryLitres, dietMultiplier },
    advice,
  };
}

// POST Endpoint that Receives User Data and Returns Water Usage Results
router.post(
  "/",
  (req: Request<{}, any, CalculateBody>, res: Response) => {
    const result = calculateFootprint(req.body);
    res.json(result);
  }
);

// Export the Router to be Mounted in the Main Server File
export default router;
