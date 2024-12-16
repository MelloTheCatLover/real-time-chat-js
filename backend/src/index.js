import express from "express";
import dotenv from "dotenv";

const dotenvConfig = dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
