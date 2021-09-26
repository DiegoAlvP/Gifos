import { paintFavoriteCards } from "../favorites.js";
import { trendingGifos } from "../../modules/trending-gifos.js";
import { deleteFavorites } from "../optionCard/delete-option.js";

export const saveFavorites = (getImage, getIconFavorites) => {
  const newGif = createNewGif(getImage);
  saveLocalStorage(newGif, getImage, getIconFavorites);
};

export const saveLocalStorage = async (newGif, getImage, getIconFavorites) => {
  const getLocalStorage = (await JSON.parse(localStorage.getItem("dbFavorites"))) || [];
  const getElementId = getLocalStorage.some((item) => item.id === getImage.id);
  if (getElementId) {
    deleteFavorites(getImage, getIconFavorites);
  } else {
    getIconFavorites.classList.add("fas");
  }
  if (getLocalStorage === null) {
    let dbFavorites = [];
    dbFavorites.push(newGif);
    localStorage.setItem("dbFavorites", JSON.stringify(dbFavorites));
  } else {
    getLocalStorage.push(newGif);
    localStorage.setItem("dbFavorites", JSON.stringify(getLocalStorage));
  }
  paintFavoriteCards();
  trendingGifos();
};

export const createNewGif = (getImage) => {
  const newGif = {
    src: getImage.src,
    user: getImage.user,
    title: getImage.title,
    alt: getImage.alt,
    id: getImage.id,
  };
  return newGif;
};