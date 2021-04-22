export default function deleteAllStylesheets() {
    document.querySelectorAll(".neutrify-style").forEach((e) => e.remove());
}