import { trendingGifos } from "../../modules/trending-gifos.js";
import { paintMygifosCards } from "../../modules/my-gifos.js";

const containerExpandCard = document.querySelector(".expand-card");
const expandCardContainer = document.querySelector(".expand-card__main");
const btnClose = document.querySelector(".expand-card__iconimg");
const imageContainer = document.querySelector(".expand-card__image");
const imageUser = document.querySelector(".expand-card__user");
const imageTitle = document.querySelector(".expand-card__title");
const expandCardContainerCards = document.querySelector(".expand-card__container-image");

export const closeCard = () => {
  btnClose.addEventListener('click', () => {
    containerExpandCard.style.display = "none";
  });
};

export const expandOptionCard = async (getImage) => {
  const getButtonIcon = expandCardContainer.querySelector(".icon-favorites");
  const getLocalStorage = (await JSON.parse(localStorage.getItem("dbFavorites"))) || [];
  const getElementId = getLocalStorage.some((item) => item.id === getImage.id);
  const fragment = document.createDocumentFragment();
  if (!getElementId) {
    getButtonIcon.classList.add("far");
    getButtonIcon.classList.remove("fas");
  }
  else {
    getButtonIcon.classList.add("fas");
  }
  trendingGifos();
  imageContainer.src = getImage.src;
  imageContainer.user = getImage.user;
  imageContainer.title = getImage.title;
  imageContainer.alt = getImage.alt;
  imageContainer.id = getImage.id;
  imageUser.innerText = getImage.user;
  imageTitle.innerText = getImage.title;
  getButtonIcon.id = getImage.id;
  containerExpandCard.style.display = "flex";

  fragment.appendChild(imageContainer);
  expandCardContainerCards.appendChild(fragment);
};

export const expandMyGifos = async (getImage) => {
  const getButtonIcon = expandCardContainer.querySelector(".icon-favorites");
  const getLocalStorage = (await JSON.parse(localStorage.getItem("dbMyGif"))) || [];
  const getElementId = getLocalStorage.some((item) => item.id === getImage.id);
  const fragment = document.createDocumentFragment();
  if (!getElementId) {
    getButtonIcon.classList.add("far");
    getButtonIcon.classList.remove("fas");
  }
  else {
    getButtonIcon.classList.add("fas");
  }
  paintMygifosCards();
  imageContainer.src = getImage.src;
  imageContainer.user = getImage.user;
  imageContainer.title = getImage.title;
  imageContainer.alt = getImage.alt;
  imageContainer.id = getImage.id;
  imageUser.innerText = getImage.user;
  imageTitle.innerText = getImage.title;
  containerExpandCard.style.display = "flex";

  fragment.appendChild(imageContainer);
  expandCardContainerCards.appendChild(fragment);
};