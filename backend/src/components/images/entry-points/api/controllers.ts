import path from "path";
import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import config from "config";
import { ImageTask } from "components/images/data-access/model";
import { spawn } from 'node:child_process';
import { COMPONENT_ROOT_PATH } from "components/images";
import { ApiError } from "libraries/errors";

export async function imageUploadController(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file as Express.Multer.File
        const { fillStr } = req.body

        const data = {
            imageSrc: file.path,
            outputSrc: path.resolve(config.RESULTS_PATH, `${file.filename}.xlsx`),
            maxWidth: 200,
            maxHeight: 200,
            fillStr: fillStr ?? "☺"
        }

        const imageTask = new ImageTask({
            data
        })
        await imageTask.save()

        const ls = spawn(
            'node', [
            path.resolve(COMPONENT_ROOT_PATH, "domain", "imageToExcel.mjs"),
            data.imageSrc,
            data.outputSrc,
            data.maxWidth,
            data.maxHeight,
            fillStr
        ]);

        ls.stdout.on('data', async (processData) => {
            if (processData.toString().startsWith("progress: ")) {
                const progress = processData.toString().split(": ")[1]
                if (imageTask.status == "pending") {
                    imageTask.status = "running"
                    await imageTask.save()
                }
            } else if (processData.toString().startsWith("done")) {
                imageTask.status = "completed"
                await imageTask.save()
                fs.unlink(data.imageSrc)
                setTimeout(() => {
                    fs.unlink(data.outputSrc)
                }, 60000)

                res.sendFile(data.outputSrc)
            }
        });

        ls.stderr.on('data', async (processData) => {
            if (processData.toString().startsWith("error: ")) {
                console.error(`stderr: ${processData}`);
                imageTask.status = "failed"
                imageTask.error = processData.toString()
                await imageTask.save()

                fs.unlink(data.imageSrc)

                throw new ApiError(500, processData.toString())
            }
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    } catch (error: any) {
        next(error)
    }
}