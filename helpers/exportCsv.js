import { createObjectCsvWriter as createCsvWriter } from "csv-writer"
import chalk from "chalk"
import fs from "fs"

export default async function exportCsv(portalId, results) {
  const filename = `export/${portalId}.csv`
  const csvWriter = createCsvWriter({
    path: filename,
    header: [
      { id: "title", title: "Title" },
      { id: "description", title: "Description" },
      { id: "spatial", title: "Spatial" },
      { id: "isAssignable", title: "isAssignable" },
      { id: "isCoordinates", title: "isCoordinates" }
    ]
  })
  await csvWriter.writeRecords(results)
  console.log(chalk.green(`✔ CSV export done: ${filename}`))
}
