const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`V.E.N.K.A.T Framework discussion: ${data.get("topic")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`
  );

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
