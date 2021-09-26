import { closeCard, expandOptionCard, expandMyGifos } from "./expand-option.js";
import { downloadFavOptionCard } from "./download-option.js";
import { saveFavorites } from "./save-option.js";
import { deleteFavorites, deleteMyGif } from "./delete-option.js";

const searchTrendingContainer = document.querySelector(".search-trending__container");
const favoritesContainerFav = document.querySelector(".favorites__container");
const trendsGifosContainerCards = document.querySelector(".trending-gifos__container-cards");
const expandCardContainer = document.querySelector(".expand-card__main");
const mygifosContainerMygifos = document.querySelector(".mygifos__container");

const mainTrendingSearch = () => {
  searchTrendingContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentItem = event.target.parentElement;
    const parentItemParent = parentItem.parentElement.parentElement.parentElement;
    const getImageTrending = parentItemParent.querySelector(".search-trending__itemimg");
    const getImageOption = parentItem.querySelector(".search-trending__itemimg");
    const getIconFavorites = parentItem.querySelector(".icon-favorites");
    const containsImageTrending = event.target.classList.contains("search-trending__itemimg");
    const containsIconFav = event.target.classList.contains("icon-favorites");
    const containsIconDow = event.target.classList.contains("icon-download");
    const containsIconMax = event.target.classList.contains("icon-max");

    console.log(getImageTrending)
    console.log(getIconFavorites)
    console.log(containsIconFav)
    console.log('------------------')

    if (containsIconFav) saveFavorites(getImageTrending, getIconFavorites);
    if (containsIconDow) downloadFavOptionCard(getImageTrending);
    if (containsIconMax) expandOptionCard(getImageTrending);
    if (containsImageTrending) expandOptionCard(getImageOption);
  });
};

const mainFavorites = () => {
  favoritesContainerFav.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentItem = event.target.parentElement;
    const parentItemParent = parentItem.parentElement.parentElement.parentElement;
    const parentImage = parentItemParent.children[1];
    const getImageFavorites = parentItemParent.querySelector(".favorites__itemimg");
    const getImageOption = parentItem.querySelector(".favorites__itemimg");
    const getIconFavorites = parentItem.querySelector(".icon-favorites");
    const containsImage = parentImage.classList.contains("favorites__itemimg");
    const containsImageFavorites = event.target.classList.contains("favorites__itemimg");
    const containsIconFav = event.target.classList.contains("icon-favorites");
    const containsIconDow = event.target.classList.contains("icon-download");
    const containsIconMax = event.target.classList.contains("icon-max");

    if (containsIconFav) deleteFavorites(getImageFavorites, getIconFavorites);
    if (containsIconDow) downloadFavOptionCard(getImageFavorites);
    if (containsIconMax) expandOptionCard(getImageFavorites);
    if (containsImageFavorites) expandOptionCard(getImageOption);
    if (containsImage && containsIconFav)parentItemParent.remove();
  });
};

const mainTrendingGifos = () => {
  trendsGifosContainerCards.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentItem = event.target.parentElement;
    const parentItemParent = parentItem.parentElement.parentElement.parentElement;
    const getImageTrendingGifos = parentItemParent.querySelector(".trending-gifos__itemsimg");
    const getImageOption = parentItem.querySelector(".trending-gifos__itemsimg");
    const getIconFavorites = parentItem.querySelector(".icon-favorites");
    const containsImageTrendinGifos = event.target.classList.contains("trending-gifos__itemsimg");
    const containsIconFav = event.target.classList.contains("icon-favorites");
    const containsIconDow = event.target.classList.contains("icon-download");
    const containsIconMax = event.target.classList.contains("icon-max");

    if (containsIconFav) saveFavorites(getImageTrendingGifos, getIconFavorites);
    if (containsIconDow) downloadFavOptionCard(getImageTrendingGifos);
    if (containsIconMax) expandOptionCard(getImageTrendingGifos);
    if (containsImageTrendinGifos) expandOptionCard(getImageOption);
  });
};

const mainExpandCard = () => {
  expandCardContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentItem = event.target.parentElement;
    const parentItemParent = parentItem.parentElement.parentElement.parentElement;
    const getImageExpandCard = parentItemParent.querySelector(".expand-card__image");
    const getIconFavorites = parentItem.querySelector(".icon-favorites");
    const containsIconFav = event.target.classList.contains("icon-favorites");
    const containsIconDow = event.target.classList.contains("icon-download");

    if (containsIconFav) saveFavorites(getImageExpandCard, getIconFavorites);
    if (containsIconDow) downloadFavOptionCard(getImageExpandCard);
  });
};

const mainMyGifos = () => {
  mygifosContainerMygifos.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentItem = event.target.parentElement;
    const parentItemParent = parentItem.parentElement.parentElement.parentElement;
    const getImageMygifos = parentItemParent.querySelector(".mygifos__itemimg");
    const getIconDelete = parentItem.querySelector(".icon-delete-mygifos");
    const containsImageMygifos = event.target.classList.contains("mygifos__itemimg");
    const containsIconDelete = event.target.classList.contains("icon-delete-mygifos");
    const containsIconDow = event.target.classList.contains("icon-download-mygifos");
    const containsIconMax = event.target.classList.contains("icon-max-mygifos");

    if (containsIconDelete) deleteMyGif(getImageMygifos, parentItemParent);
    if (containsIconDow) downloadFavOptionCard(getImageMygifos, getIconDelete);
    if (containsIconMax) expandMyGifos(getImageMygifos, getIconDelete);
    if (containsImageMygifos) expandMyGifos(getImageMygifos, getIcsonDelete);
  });
};

export const mainOption = () => {
  mainTrendingSearch();
  mainFavorites();
  mainExpandCard();
  mainTrendingGifos();
  closeCard();
  mainMyGifos();
};