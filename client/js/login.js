import { loginUser } from "./api/api.js";

const form = document.getElementById("loginForm");
const msgEl = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msgEl.textContent = "";
  msgEl.className = "msg";
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    msgEl.textContent = "Please fill in all fields.";
    msgEl.classList.add("error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in...";

  loginUser(email, password)
    .then((data) => {
      msgEl.textContent = "Login successful!";
      msgEl.classList.add("success");
      form.reset();
      window.location.href = "index.html";
    })
    .catch((error) => {
      msgEl.textContent = error.error || "Login failed.";
      msgEl.classList.add("error");
      console.log(error);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    });
});
