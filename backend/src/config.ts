import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const rootPath = path.dirname(__filename);

const config = {
  rootPath,
  publicPath: path.join(rootPath, "../public"),
  db: "mongodb://localhost/haul",
  refreshJWTSecret: process.env.REFRESH_SECRET_JWT ?? "secret",
  accessJWTSecret: process.env.ACCESS_SECRET_JWT ?? "secret",
};

export default config;
