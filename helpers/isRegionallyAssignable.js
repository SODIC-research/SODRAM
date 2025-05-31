
import regionTerms from "../data/regionTerms.js";

export default function isRegionallyAssignable({ title, description, spatial, tags = [] }) {
  const check = (text) =>
    typeof text === "string" &&
    regionTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));

  const isBoundingBox =
    spatial &&
    typeof spatial === "object" &&
    typeof spatial.xmin === "number" &&
    typeof spatial.ymin === "number" &&
    typeof spatial.xmax === "number" &&
    typeof spatial.ymax === "number";

  return (
    check(title) ||
    check(description) ||
    check(spatial) ||
    tags.some(t => check(t)) ||
    isBoundingBox
  );
}