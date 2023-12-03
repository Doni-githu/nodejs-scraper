import { parse } from "json2csv"
import fs from "fs"
export default function (data: any, fields: string[]) {
    const csv = parse(data, { fields })
    fs.writeFile('data.csv', csv, (err: Error) => {
        if (err) throw err;
        console.log("Cvs saved!!!")
    })
}