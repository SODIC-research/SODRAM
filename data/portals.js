const portals = [
  // {
  //   id: "chemnitz",
  //   name: "Chemnitz Open Data",
  //   description: "Chemnitz Open Data Portal (Arcgis Special)",
  //   type: "arcgis",
  //   baseUrl: "https://portal-chemnitz.opendata.arcgis.com/",
  //   url: "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services"
  // },
  {
    id: "leipzig",
    name: "Leipzig Open Data",
    description: "Leipzig Open Data Portal (CKAN + Sparql)",
    type: "sparql",
    baseUrl: "https://opendata.leipzig.de/",
    url: "https://opendata.leipzig.de/sparql",
    query: `
      PREFIX dcat: <http://www.w3.org/ns/dcat#>
      PREFIX dct: <http://purl.org/dc/terms/>
      SELECT ?dataset ?title ?description ?spatial WHERE {
        ?dataset a dcat:Dataset ;
                 dct:title ?title ;
                 dct:description ?description .
        OPTIONAL { ?dataset dct:spatial ?spatial }
      } LIMIT 100
    `
  },
  {
    id: "dresden",
    name: "Dresden Open Data",
    description: "Dresden Open Data Portal (DCAT-AP / DCAT RDF)",
    type: "dcat-rdf",
    baseUrl: "https://opendata.dresden.de/",
    url: "https://opendata.dresden.de/dcat-ap/catalog.rdf"
  },
  {
    id: "frankfurt",
    name: "Frankfurt Open Data",
    description: "Frankfurt Open Data Portal (DCAT-AP / DCAT RDF)",
    type: "dcat-rdf",
    baseUrl: "https://offenedaten.frankfurt.de",
    url: "https://offenedaten.frankfurt.de/dcat/catalog.rdf"
  }
];

export default portals;