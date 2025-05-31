import fs from "fs"

import portals from "./data/portals.js";

import isRegionallyAssignable from "./helpers/isRegionallyAssignable.js"
import isCoordinates from "./helpers/isCoordinates.js"
import exportCsv from "./helpers/exportCsv.js"
import summarizePortals from "./helpers/summarizePortals.js";

import fetchArcgis from "./fetches/fetchArcgis.js"
import fetchDcatRdf from "./fetches/fetchDcatRdf.js"
import fetchSparql from "./fetches/fetchSparql.js"


// https://www.dcat-ap.de/def/politicalGeocoding/regionalKey/20250131.html#145110000000

async function fetchAndAnalyze() {
  if (!fs.existsSync("export")) fs.mkdirSync("export");

  const resultsAllPortals = [];

  for (const portal of portals) {
    console.log(chalk.blue(`\n=== ${portal.name} ===`))
    let datasets = []

    if (portal.type === "sparql") {
      datasets = await fetchSparql(portal)
    }

    if (portal.type === "dcat-rdf") {
      datasets = await fetchDcatRdf(portal)
    }

    if (portal.type === "arcgis") {
      datasets = await fetchArcgis(portal)
    }

    const results = datasets.map(data => ({
      ...data,
      isAssignable: isRegionallyAssignable(data),
      isCoordinates: isCoordinates(data)
    }))

    const stats = {
      total: results.length,
      isAssignable: results.filter(d => d.isAssignable).length,
      isCoords: results.filter(d => d.isCoordinates).length
    }

    console.log(chalk.yellow(`Total datasets: ${stats.total}`))
    console.log(chalk.yellow(`isAssignable: ${stats.isAssignable} (${((stats.isAssignable / stats.total) * 100).toFixed(1)}%)`))
    console.log(chalk.cyan(`With coordinates: ${stats.isCoords} (${((stats.isCoords / stats.total) * 100).toFixed(1)}%)`))

    await exportCsv(portal.id, results);
    resultsAllPortals.push({
      id: portal.id,
      type: portal.type,
      results
    })
  }
  await summarizePortals(resultsAllPortals);
}

fetchAndAnalyze()
  .then(() => console.log(chalk.green("✔ All done!")))
  .catch(err => console.error(chalk.red("✘ Error:"), err))
  .finally(() => process.exit(0)) 