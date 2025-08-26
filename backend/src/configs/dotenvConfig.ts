import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT as string;
const MONGO_URI = process.env.MONGO_URI as string;
const JWT_SECRET = process.env.JWT_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

export {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  FRONTEND_URL
}
