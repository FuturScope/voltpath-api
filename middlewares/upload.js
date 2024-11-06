import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const chargingStationMediaUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/voltpath-api/*"
    }),
    preservePath: true
});