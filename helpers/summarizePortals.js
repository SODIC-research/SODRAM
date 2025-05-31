import fs from 'fs'

function summarizePortals(resultsByPortal) {
  const groups = {
    dcat: ['dcat', 'dcat-rdf', 'sparql', 'ckan'],
    nonstandard: ['arcgis', 'arcgis-special', 'json', 'xml']
  }

  const stats = {
    dcat: { total: 0, assignable: 0, error: 0, completenessPoints: 0 },
    nonstandard: { total: 0, assignable: 0, error: 0, completenessPoints: 0 }
  }

  for (const portal of resultsByPortal) {
    const group = groups.dcat.includes(portal.type) ? 'dcat' : 'nonstandard'

    const total = portal.results.length
    const assignable = portal.results.filter(r => r.assignable).length
    const error = total - assignable
    const completenessRatio = portal.results.filter(r => r.hasCoordinates).length / total

    stats[group].total += total
    stats[group].assignable += assignable
    stats[group].error += error
    stats[group].completenessPoints += completenessRatio
  }

  const output = []

  for (const [key, groupStats] of Object.entries(stats)) {
    const assignPerc = ((groupStats.assignable / groupStats.total) * 100).toFixed(0)
    const errorRate = ((groupStats.error / groupStats.total) * 100).toFixed(0)
    const completenessAvg = groupStats.completenessPoints / (resultsByPortal.filter(p => groups[key].includes(p.type)).length)
    const completeness =
      completenessAvg > 0.95 ? 'Very High' :
      completenessAvg > 0.80 ? 'High' :
      completenessAvg > 0.50 ? 'Medium' :
      completenessAvg > 0.30 ? 'Bad' : 'Very Bad'

    output.push({
      'Portal Type': key === 'dcat' ? 'DCAT (DCAT-RDF/CKAN/SPARQL)' : 'Non-standard (JSON/XML)',
      'Assignable (%)': Number(assignPerc),
      'Error Rate': Number(errorRate),
      'Completeness': completeness
    })
  }

  fs.writeFileSync('export/portal_summary.json', JSON.stringify({ summary: output }, null, 2))

  console.log('\nSummary:')
  console.log('┌──────────────────────────────────────────────┬──────────────────────┬────────────┬──────────────┐')
  console.log('│ Portal Type                                 │ Assignable (%)       │ Error Rate │ Completeness │')
  console.log('├──────────────────────────────────────────────┼──────────────────────┼────────────┼──────────────┤')
  for (const row of output) {
    console.log(
      `│ ${row['Portal Type'].padEnd(44)} │ ${String(row['Assignable (%)']).padEnd(20)} │ ${String(row['Error Rate']).padEnd(10)} │ ${row['Completeness'].padEnd(12)} │`
    )
  }
  console.log('└──────────────────────────────────────────────┴──────────────────────┴────────────┴──────────────┘')
}

export default summarizePortals;
