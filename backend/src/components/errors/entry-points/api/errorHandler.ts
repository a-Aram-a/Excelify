import { NextFunction, Request, Response } from "express";
import { ApiError } from "libraries/errors";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const message = err.message ?? "Unknown Server Error"
    const status = err.status ?? 500

    console.log("ErrorHandler catch:", err)

    return res.status(status).json({
        message
    })
}