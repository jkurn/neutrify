// Find all extensions and delete them
export default function deleteAllExtensions() {
  document.querySelectorAll(".neutrify").forEach((e) => e.remove());
  document.querySelectorAll(".neutrify-extension-prompt").forEach((e) => e.remove());
}
