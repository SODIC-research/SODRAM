# 🗺️ SODRAM - Specific Open Dataset Regional Analysis Metadata

This Node.js-based research tool analyzes the metadata quality of German municipal Open Data portals. Specifically, it evaluates the **regional assignability** of datasets depending on whether standardized metadata models like **DCAT-AP** and **GeoDCAT-AP** are used (typically via CKAN), best practice as a SPARQL endpoint, or non-standard formats (e.g. ArcGIS JSON).

> 🧪 Developed as part of the research poster submission for **DCMI 2025** by Florian Hahn, TU Chemnitz (SODIC Research Group)

---

## 🔍 Research Question

> _Does the use of DCAT and CKAN in municipal German Open Data portals improve the assignability of datasets to regional categories compared to non-standardized alternatives?_

---

## 📦 Features

- 🔎 Automated metadata harvesting via:

  - ArcGIS REST API
  - CKAN API
  - CKAN SPARQL
  - DCAT RDF
  - DCAT RDF SPARQL
- 🧠 Regional categorization logic using place/entity keywords
- 📊 CSV export for per-portal analysis
- 🎨 Colored console output via `chalk`
- ✍️ Easily extendable keyword classification logic

---

## 🏗️ Setup

```bash
git clone https://github.com/SODIC-research/SODRAM.git
cd SODRAM
npm install
```

---

## 🚀 Usage

Run the analysis:

```bash
npm run start
```

This will:

- Fetch metadata from German city portals (e.g. Chemnitz, Dresden, Leipzig)
- Apply classification logic
- Export results to `/export/*.csv`
- Export summary to `/export/summary.json`

---

## 📁 Output

Each analyzed portal produces a `.csv` file with the following structure:

```csv
Title,Description,Spatial,Assignable
"Population by District","...","Leipzig",true
"Verkehrsdaten 2022","...","",false
```

---

## 🧠 Methodology

- All portals are evaluated using a fixed list of **regional keywords** and spatial metadata fields (`dct:spatial`, title/description).
- The code is designed to replicate the methodology described in the poster:
  "Regional Analysis of Topic-Specific Open Datasets Through Metadata: Evaluating the Analytical Usability of DCAT vs. Non-DCAT Metadata in a Municipal Portal"

---

## 📚 References

- [DCAT-AP 3.0.0 - European Commission](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe/release/300)
- [GeoDCAT-AP 3.0.0](https://semiceu.github.io/GeoDCAT-AP/releases/3.0.0/)
- [CKAN Documentation](https://docs.ckan.org/en/latest/)

---

## 🔖 License

MIT License © 2025 Florian Hahn, TU Chemnitz, SODIC
