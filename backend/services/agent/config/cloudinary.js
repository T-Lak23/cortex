import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

console.log("name", process.env.CLOUDINARY_CLOUD_NAME);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.api
  .ping()
  .then((result) => console.log("Cloudinary connected:", result))
  .catch((error) => console.error("Cloudinary ping failed:", error));

export { cloudinary };
