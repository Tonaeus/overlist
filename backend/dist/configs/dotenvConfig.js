import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
export { PORT, MONGO_URI, JWT_SECRET, FRONTEND_URL };
//# sourceMappingURL=dotenvConfig.js.map