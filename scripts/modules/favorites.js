const btnMenu = document.querySelector(".header-nav__btn");
const favoritesContainer = document.querySelector(".favorites__container");
const optionCard = document.querySelector(".optioncard");
const optionCardUser = document.querySelector(".optioncard__user");
const optionCardTitle = document.querySelector(".optioncard__title");
const trendingContainer = document.querySelector(".search-trending");
const searchContainer = document.querySelector(".search");
const favorites = document.querySelector(".favorites");
const favoritesContainerMain = document.querySelector('.favorites__container-main');
const myFavoritesItems = document.querySelector(".favorites__items");
const btnSeeMore = document.querySelector(".favorites__btnmore");
const noResultsContainer = document.querySelector(".favorites__noresults");
const mygifos = document.querySelector(".mygifos");
const createGifosContainer = document.querySelector(".create-gifos");
const trendingGifosContainer = document.querySelector(".trending-gifos");

export const paintFavoriteCards = async () => {
  btnSeeMore.seeNext = 12;
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbFavorites")) || [];
  const getLength = getLocalStorage.length;
  const getCount = getLength >= btnSeeMore.seeNext ? 12 : getLength;
  createFavorites(getLocalStorage, getCount);
  seeEmptyFavorites();
  getLength <= 12
    ? btnSeeMore.style.display = "none"
    : btnSeeMore.style.display = "inline-block";
  mygifos.style.display = "none";
  createGifosContainer.style.display = "none";
  trendingGifosContainer.style.display = "flex";
};

const createFavorites = (data, limit) => {
  favoritesContainer.innerHTML = "";
  let cleanOptionCard = myFavoritesItems.childNodes[1];
  if (cleanOptionCard) cleanOptionCard.remove();
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < limit; index++) {
    optionCardUser.textContent = data[index].user || "No user";
    optionCardTitle.textContent = data[index].title;
    let itemClone = myFavoritesItems.cloneNode(true);
    let itemOptionCard = optionCard.cloneNode(true);
    let cloneImageId = itemOptionCard.childNodes[1].firstElementChild.firstElementChild;
    cloneImageId.id = data[index].id;
    cloneImageId.classList.add("fas");
    const itemImg = document.createElement("img");
    itemImg.classList.add("favorites__itemimg");
    itemImg.src = data[index].src;
    itemImg.id = data[index].id;
    itemImg.user = data[index].user || "No user";
    itemImg.title = data[index].title;
    itemClone.appendChild(itemOptionCard);
    itemClone.appendChild(itemImg);
    fragment.appendChild(itemClone);
  }
  favoritesContainer.appendChild(fragment);
  btnMenu.checked = false;
};

export const seeMoreFavorites = async () => {
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbFavorites")) || [];
  let seeNext = 0;
  let getLength = getLocalStorage.length;
  let getCount = btnSeeMore.seeNext;
  let totalData = getCount - getLength;
  let negativeToPositive = totalData > 0 ? getCount = 0 : totalData * -1;
      negativeToPositive < 12
        ? getCount += negativeToPositive
        : getCount += getCount;
      seeNext = getCount;
  if (seeNext === getLength) btnSeeMore.style.display = "none";
  for (let index = seeNext; index <= getLength; index++) {
    createFavorites(getLocalStorage, seeNext);
    return;
  }
};

export const seeEmptyFavorites = async () => {
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbFavorites")) || [];
  if (getLocalStorage.length === 0) {
    noResultsContainer.style.display = "inline-block";
    searchContainer.style.display = "none";
    favorites.style.display = "flex";
    favoritesContainerMain.style.display = "none";
    trendingContainer.style.display = "none";
  } else {
    noResultsContainer.style.display = "none";
    searchContainer.style.display = "none";
    favorites.style.display = "flex";
    favoritesContainerMain.style.display = "flex";
    trendingContainer.style.display = "none";
  }
};