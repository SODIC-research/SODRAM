import fetch from "node-fetch"


const fetchSparql = async (portal) => {
   if (!portal.url) {
    throw new Error("Portal URL is required")
  }
  const params = new URLSearchParams({
    query: portal.query,
    format: "application/sparql-results+json"
  })
  const res = await fetch(`${portal.url}?${params.toString()}`)
  //const res = await fetch(`${portal.url}`)
  const json = await res.json()
  let datasets;
  datasets = json.results.bindings.map(entry => ({
    title: entry.title?.value,
    description: entry.description?.value,
    spatial: entry.spatial?.value || "",
    tags: []
  }))

  return datasets
}

    export default fetchSparql