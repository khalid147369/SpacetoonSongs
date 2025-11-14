import { registerUser } from "./api/api.js";
// Update endpoint if your server expects a different path
const REGISTER_ENDPOINT = "/api/register";

const form = document.getElementById("registerForm");
const msgEl = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msgEl.textContent = "";
  msgEl.className = "msg";
  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!username || !email || !password) {
    msgEl.textContent = "Please fill in all fields.";
    msgEl.classList.add("error");
    return;
  }
  // basic client-side checks
  if (username.length < 3) {
    msgEl.textContent = "Username must be at least 3 characters.";
    msgEl.classList.add("error");
    return;
  }
  if (password.length < 6) {
    msgEl.textContent = "Password must be at least 6 characters.";
    msgEl.classList.add("error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Registering...";

  // Call the registerUser function from api.js
  registerUser(username, email, password)
    .then((data) => {
      msgEl.textContent = "Registration successful!";
      msgEl.classList.add("success");
      form.reset();
    })
    .catch((error) => {
      msgEl.textContent = error.error || "Registration failed.";
      msgEl.classList.add("error");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Register";
    });
});
