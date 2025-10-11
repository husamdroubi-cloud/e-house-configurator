export function validateLayout(layout) {
  if (!layout || Object.keys(layout).length === 0) {
    return "Layout cannot be empty";
  }
  return null;
}

export function validateEquipment(equipment) {
  if (!equipment || equipment.length === 0) {
    return "At least one equipment item is required";
  }
  return null;
}
