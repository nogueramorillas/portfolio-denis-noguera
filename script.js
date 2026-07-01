if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
if (location.hash) {
  history.replaceState(null, "", location.pathname + location.search);
}
const resetScrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
resetScrollToTop();
window.addEventListener("load", resetScrollToTop);
document.fonts && document.fonts.ready.then(resetScrollToTop);
[50, 150, 300, 600, 1000].forEach((delay) => setTimeout(resetScrollToTop, delay));

const header = document.querySelector("[data-header]");
const whatsappPhone = "34645513694";

const syncHeader = () => {
  header.classList.toggle("is-solid", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const buildWhatsappUrl = (message) => {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
};

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = link.dataset.message || "Hola, me gustaría hablar sobre una web para mi negocio.";
  link.href = buildWhatsappUrl(message);
});

document.querySelectorAll(".service-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    document.querySelectorAll(".service-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".service-list").forEach((p) => p.classList.add("hidden"));
    tab.classList.add("active");
    document.querySelector(`[data-panel="${target}"]`).classList.remove("hidden");
  });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");
  const name = form.elements.nombre.value.trim();
  const email = form.elements.email.value.trim();
  const details = form.elements.mensaje.value.trim();
  const message = [
    "Hola, he visto el portfolio y quiero hablar sobre una web.",
    name ? `Nombre: ${name}` : "",
    email ? `Email: ${email}` : "",
    details ? `Necesidad: ${details}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  button.textContent = "Abriendo WhatsApp";
  window.open(buildWhatsappUrl(message), "_blank", "noopener");
  setTimeout(() => {
    button.textContent = "Enviar por WhatsApp";
  }, 1800);
});
