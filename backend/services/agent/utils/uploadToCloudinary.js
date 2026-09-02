import { cloudinary } from "../config/cloudinary.js";

export const uploadToCloudinary = async (
  buffer,
  resourceType = "auto",
  filename = null,
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cortex",
        resource_type: resourceType,
        ...(filename && { public_id: filename }),
      },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload failed:", error);

          reject(new Error("The uploaded file could not be uploaded"));
          return;
        }

        resolve(result.secure_url);
      },
    );

    stream.end(buffer);
  });
};
