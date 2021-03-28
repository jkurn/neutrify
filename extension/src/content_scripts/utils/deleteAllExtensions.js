// Find all extensions and delete them
export default function deleteAllExtensions() {
  document.querySelectorAll(".neutrify").forEach((e) => e.remove());
}
