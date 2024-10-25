import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "djkeoamsn",
  api_key: process.env.API_KEY || "641998276337333",
  api_secret: process.env.API_SECRET || "NvXl_w_WNnX_M98xTawz0rrCSKM",
});

console.log(
  "Cloudinary Config:",
  process.env.CLOUD_NAME,
  process.env.API_KEY,
  process.env.API_SECRET
);

export default cloudinary;
