import { RdfXmlParser } from 'rdfxml-streaming-parser'
import { Readable } from 'stream'
import fetch from 'node-fetch'
import { DataFactory } from 'n3'

const { namedNode, literal } = DataFactory

const parseRDFCatalog = async (url) =>{
  const res = await fetch(url)
  const rdf = await res.text()

  const parser = new RdfXmlParser()
  const quadStream = parser.import(Readable.from([rdf]))

  const datasets = []
  const buffer = {}

  return new Promise((resolve, reject) => {
    quadStream.on('data', quad => {
      const s = quad.subject.value
      const p = quad.predicate.value
      const o = quad.object

      if (!buffer[s]) buffer[s] = {}

      // Example: get title, description, spatial
      if (p.includes('dcterms/title')) {
        buffer[s].title = o.value
      } else if (p.includes('dcterms/description')) {
        buffer[s].description = o.value
      } else if (p.includes('dcterms/spatial')) {
        buffer[s].spatial = o.value
      } else if (p.includes('dcat/keyword')) {
        buffer[s].tags = buffer[s].tags || []
        buffer[s].tags.push(o.value)
      }
    })

    quadStream.on('end', () => {
      const output = Object.values(buffer)
        .filter(d => d.title || d.description)
      resolve(output)
    })

    quadStream.on('error', reject)
  })
}
const fetchDcatRdf = async (portal) => {
   if (!portal.url) {
    throw new Error("Portal URL is required")
  }
  const url = portal.url
  const datasets = await parseRDFCatalog(url)
  return datasets.map(data => ({
    title: data.title || '',
    description: data.description || '',
    spatial: data.spatial || '',
    tags: data.tags || []
  }))
}

export default fetchDcatRdf;