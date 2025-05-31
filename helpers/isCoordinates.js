export default function isCoordinates(data) {
  if (!data.spatial) return false
  try {
    const spatial = typeof data.spatial === "string" ? JSON.parse(data.spatial) : data.spatial

    if (Array.isArray(spatial) && spatial.length >= 4) return true
    if (spatial.coordinates) return true
    if ("lat" in spatial && "lon" in spatial) return true
  } catch (e) {
    return false
  }
  return false
}
