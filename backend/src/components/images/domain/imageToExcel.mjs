import jimp from "jimp";
import exceljs from "exceljs";

const [imageSrc, outputSrc, maxWidth, maxHeight, fillStr] = process.argv.slice(2)

if(!imageSrc || !outputSrc) {
    console.log("error: imageSrc and outputSrc are required")
    process.exit(1)
}

await imageToExcel(
    imageSrc,
    outputSrc,
    (progress) => {
        console.log(`progress: ${progress}`)
    },
    (err) => {
        if(err) {
            console.log(`error: ${err}`)
        } else {
            console.log("done")
        }
    },
    !isNaN(Number(maxWidth)) ? Number(maxWidth) : 200,
    !isNaN(Number(maxHeight)) ? Number(maxHeight) : 200,
    fillStr ?? "☺"
)

async function imageToExcel(
    imageSrc,
    outputSrc,
    onProgress,
    onFinish,
    maxWidth = 200,
    maxHeight = 200,
    fillStr = "☺") {

    try {
        const workbook = new exceljs.Workbook();
        workbook.creator = 'Excelify';
        workbook.lastModifiedBy = 'Excelify';
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();
        workbook.properties.date1904 = true;

        const worksheet = workbook.addWorksheet('Excelify');

        let image = await readImage(imageSrc)
        let width = image.bitmap.width
        let height = image.bitmap.height
        const aspectRatio = width / height

        if (aspectRatio > 1) {
            if (width > maxWidth) {
                width = maxWidth
                height = width / aspectRatio
            }
        } else {
            if (height > maxHeight) {
                height = maxHeight
                width = height * aspectRatio
            }
        }

        image = image.resize(width, height)

        const imageBytes = Uint8Array.from(image.bitmap.data)

        const cellsCount = width * height
        let sentProgress = 0

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4
                const r = imageBytes[i]
                const g = imageBytes[i + 1]
                const b = imageBytes[i + 2]
                const a = imageBytes[i + 3]

                const progress = (i / 4) / cellsCount
                if (progress - sentProgress > 0.05) {
                    sentProgress = progress
                    onProgress(progress)
                }

                const cellR = worksheet.getCell(3 * y + 1, x + 1)
                const cellG = worksheet.getCell(3 * y + 2, x + 1)
                const cellB = worksheet.getCell(3 * y + 3, x + 1)
                cellR.value = fillStr
                cellG.value = fillStr
                cellB.value = fillStr

                cellR.style.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: rgbToArgb(r, 0, 0) }
                }
                cellG.style.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: rgbToArgb(0, g, 0) }
                }
                cellB.style.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: rgbToArgb(0, 0, b) }
                }
            }
        }

        await workbook.xlsx.writeFile(outputSrc);

        onFinish(null)
    } catch (err) {
        onFinish(err)
    }

    function readImage(imageSrc) {
        return new Promise((resolve, reject) => {
            jimp.read(imageSrc, (err, image) => {
                if (err) reject(err)
                resolve(image)
            })
        })
    }

    function rgbToArgb(red, green, blue) {
        return `FF${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    }
}