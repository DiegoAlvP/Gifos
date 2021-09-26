import { getMygifosDataById } from "../connectionApi.js";

const btnMenu = document.querySelector(".header-nav__btn");
const mygifosContainer = document.querySelector(".mygifos__container");
const optionCard = document.querySelector(".optioncard-mygifos");
const optionCardUser = document.querySelector(".optioncard-mygifos__user");
const optionCardTitle = document.querySelector(".optioncard-mygifos__title");
const trendingContainer = document.querySelector(".search-trending");
const searchContainer = document.querySelector(".search");
const mygifos = document.querySelector(".mygifos");
const mygifosContainerMain = document.querySelector('.mygifos__container-main');
const myGifosItems = document.querySelector(".mygifos__items");
const btnSeeMore = document.querySelector(".mygifos__btnmore");
const noResultsMygifosContainer = document.querySelector(".mygifos__noresults");
const favorites = document.querySelector(".favorites");
const createGifosContainer = document.querySelector(".create-gifos");
const trendingGifosContainer = document.querySelector(".trending-gifos");

export const paintMygifosCards = async () => {
  btnSeeMore.seeNext = 12;
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbMyGif")) || [];
  const getLength = getLocalStorage.length;
  const getCount = getLength >= btnSeeMore.seeNext ? 12 : getLength;
  await paintMyGifos(getCount);
  seeEmptyMygifos();
  getLength <= 12
    ? btnSeeMore.style.display = "none"
    : btnSeeMore.style.display = "inline-block";
  favorites.style.display = "none";
  createGifosContainer.style.display = "none";
  trendingGifosContainer.style.display = "flex";
};

export const getDataMyGif = async () => {
  try {
    const getLocalStorage = await JSON.parse(localStorage.getItem("dbMyGif")) || [];
    if (getLocalStorage.length) {
      const resultData = await Promise.all(
        getLocalStorage.map(async (id) => {
          const resultId = await getMygifosDataById(id);
          if (id === resultId.data.id) return resultId;
        })
      );
      return resultData
    }
  } catch (error) {
    console.log(error);
  }
};

const paintMyGifos = async (limit) => {
  const dataMyGif = await getDataMyGif();
  mygifosContainer.innerHTML = "";
  let cleanOptionCard = myGifosItems.childNodes[1];
  if (cleanOptionCard) cleanOptionCard.remove();
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < limit; index++) {
    if (dataMyGif[index] != undefined && dataMyGif[index] != null) {
      let resultDataMyGif = dataMyGif[index].data;
      optionCardUser.textContent = resultDataMyGif.username || "No user";
      optionCardTitle.textContent = resultDataMyGif.title || "No title";
      let itemClone = myGifosItems.cloneNode(true);
      let itemOptionCard = optionCard.cloneNode(true);
      const itemImg = document.createElement("img");
      itemImg.classList.add("mygifos__itemimg");
      itemImg.src = resultDataMyGif.images.fixed_height.url;
      itemImg.id = resultDataMyGif.id;
      itemImg.user = resultDataMyGif.username || "No user";
      itemImg.title = resultDataMyGif.title || "No title";
      itemImg.alt = resultDataMyGif.title || "My Gif";
      itemClone.appendChild(itemOptionCard);
      itemClone.appendChild(itemImg);
      fragment.appendChild(itemClone);
    }
  }
  mygifosContainer.appendChild(fragment);
  btnMenu.checked = false;
};

export const seeMoreMygifos = async () => {
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbMyGif")) || [];
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
    paintMyGifos(seeNext);
    return;
  }
};

export const seeEmptyMygifos = async () => {
  const getLocalStorage = await JSON.parse(localStorage.getItem("dbMyGif")) || [];
  if (getLocalStorage.length === 0) {
    noResultsMygifosContainer.style.display = "inline-block";
    searchContainer.style.display = "none";
    mygifos.style.display = "flex";
    mygifosContainerMain.style.display = "none";
    trendingContainer.style.display = "none";
  } else {
    noResultsMygifosContainer.style.display = "none";
    searchContainer.style.display = "none";
    mygifos.style.display = "flex";
    mygifosContainerMain.style.display = "flex";
    trendingContainer.style.display = "none";
  }
};