const btnMenu = document.querySelector(".header-nav__btn");
const mainContainer = document.querySelector("#mainContainer");
const btnDark = document.querySelector("#btnDark");
const mainLogoContainer = document.querySelector(".header-nav__logo")

export const darkMode = () => {
  let getstatus = localStorage.getItem('dark-mode');
  const urlImglight = "assets/logo-mobile.svg";
  const urlImgDark = "assets/logo-mobile-modo-noct.svg";
  const image = document.createElement("img");
  image.classList.add("header-nav__image");
  let imgDark = image;
  let imglight = image;

  btnDark.addEventListener('click', () => {
    let currentMode = mainContainer.classList.toggle("main-dm");
    let mode = currentMode ? "Modo Diurno" : "Modo Nocturno";
    btnDark.textContent = mode;

    if (mode === "Modo Diurno") {
      imgDark.src = urlImgDark;
      mainLogoContainer.appendChild(imgDark);
    } else if ("Modo Nocturno"){
      imglight.src = urlImglight;
      mainLogoContainer.appendChild(imglight);
    }

    let currentStatus = currentMode ? true : false;
    localStorage.setItem("dark-mode", currentStatus);
    btnMenu.checked = false;
  })

  if (getstatus === 'true') {
    imgDark.src = urlImgDark;
    mainContainer.classList.add("main-dm");
    btnDark.textContent = "Modo Diurno";
    mainLogoContainer.appendChild(imgDark);
  } else {
    imglight.src = urlImglight;
    mainContainer.classList.remove("main-dm");
    btnDark.textContent = "Modo Nocturno";
    mainLogoContainer.appendChild(imglight);
  }
};