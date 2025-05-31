import fetch from "node-fetch"

const fetchArcgis = async (portal) => {
  if (!portal.url) {
    throw new Error("Portal URL is required")
  }
  const baseUrl = portal.url
  const res = await fetch(`${baseUrl}?f=json`)
  const json = await res.json()
  const services = json.services || []
  const datasets = []

  for (const service of services) {
    const serviceUrl = `${baseUrl}/${service.name}/FeatureServer/0?f=json`

    try {
      const detailRes = await fetch(serviceUrl)
      const detail = await detailRes.json()

      datasets.push({
        title: service.name,
        description: detail.description || detail.serviceDescription || "",
        spatial: detail.extent ? JSON.stringify(detail.extent) : "",
        tags: []
      })
    } catch (e) {
      console.warn(`⚠️ Skipping ${service.name}: ${e.message}`)
    }
  }

  return datasets
}

export default fetchArcgis