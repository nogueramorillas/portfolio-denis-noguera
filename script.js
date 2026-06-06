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
  const message = link.dataset.message || "Hola Denis, me gustaria hablar sobre una web para mi negocio.";
  link.href = buildWhatsappUrl(message);
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");
  const name = form.elements.nombre.value.trim();
  const email = form.elements.email.value.trim();
  const details = form.elements.mensaje.value.trim();
  const message = [
    "Hola Denis, he visto tu portfolio y quiero hablar sobre una web.",
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
