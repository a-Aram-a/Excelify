import { NextFunction, Request, Response } from "express";
import { ApiError } from "libraries/errors";
import fs from "fs/promises";

export function filterUploadFileType(allowedTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.file) {
            return next(new ApiError(400, "File is missing"))
        }
        if (allowedTypes.includes(req.file.mimetype)) {
            return next();
        } else {
            fs.unlink(req.file.path)
            return next(new ApiError(400, "Invalid file type"))
        }
    }
}