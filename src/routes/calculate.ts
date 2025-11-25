import express, { Request, Response } from "express";

const router = express.Router();

type DietType = "plant-based" | "balanced" | "meat-heavy" | string;

interface CalculateBody {
  showersPerWeek: number | string;
  avgShowerMinutes: number | string;
  laundryLoadsPerWeek: number | string;
  diet: DietType;
}

function calculateFootprint(data: CalculateBody) {
  const {
    showersPerWeek,
    avgShowerMinutes,
    laundryLoadsPerWeek,
    diet,
  } = data;

  const showers = Number(showersPerWeek);
  const minutes = Number(avgShowerMinutes);
  const laundry = Number(laundryLoadsPerWeek);

  const LITERS_PER_MIN_SHOWER = 10;
  const LITERS_PER_LAUNDRY = 50;

  const showersPerDay = showers / 7;
  const showerLitres = showersPerDay * minutes * LITERS_PER_MIN_SHOWER;

  const laundryPerDay = laundry / 7;
  const laundryLitres = laundryPerDay * LITERS_PER_LAUNDRY;

  const dietMultiplierMap: Record<string, number> = {
    "plant-based": 0.8,
    balanced: 1.0,
    "meat-heavy": 1.3,
  };

  const dietMultiplier = dietMultiplierMap[diet] ?? 1.0;

  const total = Math.round((showerLitres + laundryLitres) * dietMultiplier);

  const advice: string[] = [];

  if (showerLitres > 80) {
    advice.push("Try shorter showers to reduce water use.");
  } else {
    advice.push("Your shower usage looks reasonable.");
  }

  if (diet === "meat-heavy") {
    advice.push("Reducing meat intake slightly can lower your water footprint.");
  } else {
    advice.push("Your diet has a moderate water impact.");
  }

  return {
    totalLitresPerDay: total,
    breakdown: { showerLitres, laundryLitres, dietMultiplier },
    advice,
  };
}

router.post(
  "/",
  (req: Request<{}, any, CalculateBody>, res: Response) => {
    const result = calculateFootprint(req.body);
    res.json(result);
  }
);

export default router;
