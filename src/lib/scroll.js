// shared scroll helpers used by header + footer
export function handleBackToTop() {
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
    mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
