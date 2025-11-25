import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import calculateRoute from "./routes/calculate";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// hello world route
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

// calculator route
app.use("/api/calculate", calculateRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
