const form = document.querySelector("#commentForm");
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#commentName");
const textInput = document.querySelector("#commentText");
const commentsEl = document.querySelector("#comments");
const countEl = document.querySelector("#commentCount");
const clearButton = document.querySelector("#clearComments");
const storageKey = "venkat-framework-comments";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`V.E.N.K.A.T Framework discussion: ${data.get("topic")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`
  );

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

function getComments() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(storageKey, JSON.stringify(comments));
}

function renderComments() {
  const comments = getComments();
  commentsEl.innerHTML = "";
  countEl.textContent = `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`;

  comments.forEach((comment) => {
    const item = document.createElement("article");
    item.className = "comment";

    const name = document.createElement("strong");
    name.textContent = comment.name;

    const time = document.createElement("time");
    time.dateTime = comment.createdAt;
    time.textContent = new Date(comment.createdAt).toLocaleString();

    const body = document.createElement("p");
    body.textContent = comment.text;

    item.append(name, time, body);
    commentsEl.prepend(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    return;
  }

  const comments = getComments();
  comments.push({
    name,
    text,
    createdAt: new Date().toISOString()
  });

  saveComments(comments);
  form.reset();
  renderComments();
});

clearButton.addEventListener("click", () => {
  saveComments([]);
  renderComments();
});

renderComments();
