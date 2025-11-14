import { getSongs ,logoutUser } from "./api/api.js";
let cardsData = [
  {
    title: "Card uno",
    text: "Texto descriptivo de la primera tarjeta.",
    image: "../img/Goku.png",
    audio: "../audio/audio_combinado.mp3",
  },
  {
    title: "Card dos",
    text: "Segunda tarjeta con más información.",
    image: "../img/ezgif-4b157aa7e09b76.png",
    audio: "../audio/audio_combinado.mp3",
  },
  {
    title: "Card tres",
    text: "Tercera con texto más largo para probar alturas.",
    image: "../img/ezgif-4b157aa7e09b76.png",
    audio: "../audio/audio_combinado.mp3",
  },
  {
    title: "Card cuatro",
    text: "Otra tarjeta más.",
    image: "../img/ezgif-4b157aa7e09b76.png",
    audio: "../audio/audio_combinado.mp3",
  },
  {
    title: "Card cinco",
    text: "Y otra más — demostración de repetición automática.",
    image: "../img/ezgif-4b157aa7e09b76.png",
    audio: "../audio/audio_combinado.mp3",
  },
];

const BACKEND_URL = "https://spacesongsbackend.onrender.com";

async function mostrarDatos() {
  const data = await getSongs();
  console.log("from main.js", data);
  cardsData = data;
  renderWithTemplate();
}

mostrarDatos();

// datos de ejemplo (podrían venir de una API)

// Function that on click rotates img
const cardMechanism = (imge, aud) => {
  //Pause all audios when a new one is played
  const pauseOtherAudios = () => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      audio.currentTime = 0;
      audio.pause();
    });
  };
  // Pause all imgs when a new one is played
  const pauseOtherImgs = () => {
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      if (img.id !== imge.id) img.classList.remove("rotated");
    });
  };
  // Function that toggles play/pause audio
  const togglePlayAudio = () => {
    if (aud.paused) {
      pauseOtherAudios();
      aud.play();
    } else {
      aud.currentTime = 0;
      aud.pause();
    }
  };
  // Function that toggles rotate img
  const togglePlayImg = () => {
    pauseOtherImgs();
    imge.classList.toggle("rotated");
  };
  imge.addEventListener("click", () => {
    togglePlayImg();
    togglePlayAudio();
  });
};
/* ===== Enfoque A: template + cloneNode ===== */
function renderWithTemplate() {
  const tpl = document.getElementById("card-template");
  const target = document.getElementById("grid-template");

  // create cards from template
  cardsData.forEach((item, index) => {
    console.log(BACKEND_URL + item.audio);
    // clona la plantilla (true para clonar nodos hijos)
    const node = tpl.content.cloneNode(true);
    node.querySelector(".img").src = BACKEND_URL + item.image;
    node.querySelector(".img").id = item._id;
    node.querySelector(".img").alt = item.title;
    node.querySelector(".title").textContent = item.title;
    node.querySelector(".text").textContent = item.text;
    node.querySelector(".audio").src = BACKEND_URL + item.audio;
    node.querySelector(".audio").id = index;

    // pass item to rotate
    cardMechanism(node.querySelector(".img"), node.querySelector(".audio"));

    //animation delay for each card
    setTimeout(() => {
      target.appendChild(node);
      console.log(index);
    }, index * 300);
  });
  // handle user login state
  const user = JSON.parse(localStorage.getItem("user"));
  const loginLink = document.getElementById("login_link");
  const profileLink = document.getElementById("profile_link");
  const panelLink = document.getElementById("panel_link");
  const logoutLink = document.getElementById("logout_link");
// all is good just tcheck why refreshtoken doesnt desapear when logout <=============================
  logoutLink.addEventListener("click",async () => {
    const token=localStorage.getItem("accessToken");
    const response =await logoutUser(token);
    console.log("token",response);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    location.reload();
  });
  if (user) {
    loginLink.style.display = "none";
    if (user.role === "admin")
        panelLink.style.display = "inline";
    else
      panelLink.style.display = "none";
    profileLink.style.display = "inline";
    profileLink.textContent = user.username;
    logoutLink.style.display = "inline";
  }else {
    loginLink.style.display = "inline";
    panelLink.style.display = "none";
    profileLink.style.display = "none";
    logoutLink.style.display = "none";
  }
  

}
