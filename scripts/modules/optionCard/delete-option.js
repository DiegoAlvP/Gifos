import { paintFavoriteCards } from "../favorites.js";
import { trendingGifos } from "../../modules/trending-gifos.js";

const searchContainer = document.querySelector(".search");
const favoritesContainer = document.querySelector(".favorites");
const myGifosContainer = document.querySelector(".mygifos");

export const deleteFavorites = async (getImage, getIconFavorite) => {
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbFavorites"));
  let deleteId = getLocalStorage.findIndex( (element) => element.id === getImage.id);
  getLocalStorage.splice(deleteId, 1);
  localStorage.setItem("dbFavorites", JSON.stringify(getLocalStorage));
  if (getLocalStorage.length === 0 || getLocalStorage.length === []) {
    favoritesContainer.style.display = "none";
    searchContainer.style.display = "flex";
  }
  getIconFavorite.classList.remove("fas");
  getIconFavorite.classList.add("far");
  trendingGifos();
};

export const deleteMyGif = async (getImage, parentItem) => {
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbMyGif"));
  let deleteId = getLocalStorage.findIndex( (element) => element === getImage.id);
  if (getImage.id) {
    parentItem.parentNode.removeChild(parentItem);
    getLocalStorage.splice(deleteId, 1);
    localStorage.setItem("dbMyGif", JSON.stringify(getLocalStorage));
  }
  if (getLocalStorage.length === 0 || getLocalStorage.length === []) {
    myGifosContainer.style.display = "none";
    searchContainer.style.display = "flex";
  }
};