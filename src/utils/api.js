export function fetchProject() {
  return Promise.resolve({
    id: 1,
    name: "Pilot E-House Project",
    status: "In Progress",
  });
}

export function saveProject(data) {
  console.log("Saving project...", data);
  return Promise.resolve({ success: true });
}
