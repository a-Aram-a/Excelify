import jimp from "jimp";
import exceljs from "exceljs";

const workbook = new exceljs.Workbook();
workbook.creator = 'Excelify';
workbook.lastModifiedBy = 'Excelify';
workbook.created = new Date();
workbook.modified = new Date();
workbook.lastPrinted = new Date();
workbook.properties.date1904 = true;

const worksheet = workbook.addWorksheet('Excelify');

jimp.read("C:/Users/aramt/Desktop/image.jpg", (err, image) => {
    const width = image.bitmap.width
    const height = image.bitmap.height
    const imageBytes = Uint8Array.from(image.bitmap.data)

    for(let y = 0; y < height; y++) {
        worksheet.addRow(new Array(width).fill(0))
        for(let x = 0; x < width; x++) {
            const i = (y * width + x) * 4
            const r = imageBytes[i]
            const g = imageBytes[i + 1]
            const b = imageBytes[i + 2]
            const a = imageBytes[i + 3]
            console.log(r, g, b, a)
            const cell = worksheet.getCell(y + 1, x + 1)
            cell.style.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: `${a.toString(16)}${r.toString(16)}${g.toString(16)}${b.toString(16)}` }
            };
        }
    }

    workbook.xlsx.writeFile("result.xlsx");
})