import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async () => {
  cloudinary.config({
    cloud_name: "health-care-server",
    api_key: "827697174976271",
    api_secret: "1RQ0eGSyNe-NdjgF78OjUrqne4w", // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(process.cwd() + "/uploads/IMG_20240926_202311.jpg", {
      public_id: "shoes",
    })
    .catch((error) => {
      console.dir(error, { depth: "infinity" });
    });

  console.log("uploadResult", uploadResult);
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
