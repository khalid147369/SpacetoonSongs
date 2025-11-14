import { addSong } from "../api/panelApi.js";

const form = document.getElementById("addSongForm");
const imageInput = document.getElementById("image");
const audioInput = document.getElementById("audio");
const previewArea = document.getElementById("previewArea");
const msgEl = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

function clearPreview() {
  previewArea.innerHTML = "";
}

imageInput.addEventListener("change", () => {
  clearPreview();
  const file = imageInput.files[0];
  if (!file) return;
  const img = document.createElement("img");
  img.alt = "Cover preview";
  img.src = URL.createObjectURL(file);
  img.onload = () => URL.revokeObjectURL(img.src);
  previewArea.appendChild(img);
});

audioInput.addEventListener("change", () => {
  const file = audioInput.files[0];
  const existingAudio = previewArea.querySelector("audio");
  if (existingAudio) existingAudio.remove();
  if (!file) return;
  const audioEl = document.createElement("audio");
  audioEl.controls = true;
  audioEl.src = URL.createObjectURL(file);
  audioEl.onloadeddata = () => URL.revokeObjectURL(audioEl.src);
  previewArea.appendChild(audioEl);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msgEl.textContent = "";
  msgEl.className = "msg";
  const title = form.title.value.trim();
  if (!title) {
    msgEl.textContent = "Please add a title.";
    msgEl.classList.add("error");
    return;
  }

  const fd = new FormData();
  fd.append("title", title);
  if (imageInput.files[0]) fd.append("image", imageInput.files[0]);
  if (audioInput.files[0]) fd.append("audio", audioInput.files[0]);

  submitBtn.disabled = true;
  submitBtn.textContent = "Uploading...";

  try {
    const data = await addSong(fd);
    msgEl.textContent = data.message || "Song added successfully.";
    msgEl.classList.add("success");
    form.reset();
    clearPreview();
  } catch (error) {
    msgEl.textContent = error.error || error.message || "Upload failed.";
    msgEl.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Add Song";
  }
});
