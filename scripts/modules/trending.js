import { getData } from "../connectionApi.js";

const inputSearch = document.querySelector(".search__text");
const btnSearch = document.querySelector(".search__icon");
const btnSearchOff = document.querySelector(".search__iconoff");
const searchContent = document.querySelector(".search__content");
const trendingContainer = document.querySelector(".search-trending");
const searchTrendingTitle = document.querySelector(".search-trending__itemtitle");
const trendingContainerMain = document.querySelector(".search-trending__container-main");
const searchTrendingContainer = document.querySelector(".search-trending__container");
const searchTrendingItems = document.querySelector(".search-trending__items");
const btnSeeMore = document.querySelector(".search-trending__btnmore");
const noResults = document.querySelector(".search-trending__noresults");
const optionCard = document.querySelector(".optioncard");
const optionCardUser = document.querySelector(".optioncard__user");
const optionCardTitle = document.querySelector(".optioncard__title");
const favoritesContainer = document.querySelector(".favorites");

export const getDataList = async (event) => {
  const dataResultList = await getData("search/tags", event.target.value);
  let data = await dataResultList.data;
  await paintSuggestionsList(data);
  await pressEnterKey(event);
  changeIcons();
}

const paintSuggestionsList = async (data) => {
  if (data.length) {
    searchContent.innerHTML = "";
    for (let index = 0; index < 4; index++) {
      const containerList = document.createElement("div");
      const iconList = document.createElement("i");
      const itemList = document.createElement("div");
      containerList.setAttribute("class", "items__autocomplete__list");
      iconList.setAttribute("class", "fas fa-search search__iconlist");
      itemList.setAttribute("class", "search__item");
      itemList.innerText = data[index].name;
      containerList.appendChild(iconList);
      containerList.appendChild(itemList);
      iconList.addEventListener("click", function (event) {
        compareValue(event);
      });
      itemList.addEventListener("click", function (event) {
        inputSearch.value = this.textContent;
        trendingContainer.style.display = "flex";
        trendingContainerMain.style.display = "flex";
        compareValue(event);
      });
      searchContent.appendChild(containerList);
    }
  } else {
    searchContent.innerHTML = "";
  }

  document.addEventListener("click", () => {
    closeList();
  });
}

export const paintSearchResult = async (dataUrl, limit) => {
  let data = dataUrl.data;
  let cleanOptionCard = searchTrendingItems.childNodes[1];
  if (cleanOptionCard) cleanOptionCard.remove();
  const fragment = document.createDocumentFragment();
  searchTrendingContainer.innerHTML = "";
  for (let index = 0; index < limit; index++) {
    optionCardUser.textContent = data[index].username || "No user";
    optionCardTitle.textContent = data[index].title || "No title";
    searchTrendingTitle.title = data[index].title;
    const itemsClone = searchTrendingItems.cloneNode(true);
    const itemOptionCard = optionCard.cloneNode(true);
    let cloneCard = await itemOptionCard.childNodes[1].firstElementChild.firstElementChild;
    cloneCard.id = data[index].id
    const path = data[index].images.fixed_height.url;
    const itemImg = document.createElement("img");
    itemImg.classList.add("search-trending__itemimg");
    itemImg.setAttribute("src", path);
    itemImg.id = data[index].id;
    itemImg.user = data[index].username || "No user";
    itemImg.title = data[index].title || "No title";
    itemImg.alt = data[index].title;
    itemsClone.appendChild(itemOptionCard);
    itemsClone.appendChild(itemImg);
    fragment.appendChild(itemsClone);
    validateExistingId(cloneCard);
  }
  searchTrendingContainer.appendChild(fragment);
  inputSearch.value = "";
  inputSearch.focus();
};

const getSearchData = async (searchResult, limit, offset) => {
  const dataResult = await getData("search", searchResult, limit, offset);
  const data = dataResult.data;
  return {
    data: data,
    count: data.length
  }
};

export const compareValue = async (event) => {
  btnSeeMore.style.display = "inline-block";
  let result;
  const valueQuery = inputSearch.value;
  const getEnter = event.target.classList.contains("search__text")
  const getItem = event.target.classList.contains("search__item")
  const getIconList = event.target.classList.contains("search__iconlist")
  const getIcon = event.target.classList.contains("search__icon")
  if (getEnter) result = event.target.value;
  if (getItem) result = event.target.textContent;
  if (getIconList) result = event.target.nextSibling.textContent;
  if (getIcon) result = valueQuery;

  let data = await getSearchData(result);
  if (data) {
    btnSeeMore.valueResult = result;
    btnSeeMore.paginationResult = data.count;
    btnSeeMore.counter = 1;
    btnSeeMore.nextValue = 12;
    searchTrendingTitle.textContent = result;
    if (!data.data.length && valueQuery) {
      trendingContainerMain.style.display = "none";
      trendingContainer.style.display = "block";
      noResults.style.display = "block";
      inputSearch.value = "";
      inputSearch.focus();
    } else {
      if (valueQuery) {
        await paintSearchResult(data, 12);
        noResults.style.display = "none";
        trendingContainer.style.display = "flex";
        trendingContainerMain.style.display = "flex";
      } else {
        trendingContainer.style.display = "none";
        trendingContainerMain.style.display = "none";
      }
    }
    btnSearch.style.left = "initial";
    btnSearchOff.style.visibility = "hidden";
  }
  else {
    searchTrendingTitle.textContent = result;
    noResults.style.display = "block";
    return
  }
  favoritesContainer.style.display = "none";
};

export const seeMoreResults = async () => {
  let limit = 50;
  let paginationResult = Math.round(btnSeeMore.paginationResult / 12);
  btnSeeMore.valueResult = btnSeeMore.valueResult;
  btnSeeMore.nextValue = btnSeeMore.nextValue + 12;
  let valueResult = btnSeeMore.valueResult;
  let nextValue = btnSeeMore.nextValue;
  let counter = btnSeeMore.counter ++;
  if (counter + 1 == paginationResult) {
    btnSeeMore.style.display = 'none';
  }
  let data = await getSearchData(valueResult, limit);
  for (let index = nextValue; index <= data.data.length; index++) {
    await paintSearchResult(data, nextValue);
    return
  };
};

const pressEnterKey = async (event) => {
  if (event.code === "Enter") {
    let data = event;
    data.name = event.target.value;
    searchTrendingTitle.innerText = data.name;
    await compareValue(data);
    closeList();
  }
};

const closeList = () => {
  const items = document.querySelectorAll(".items__autocomplete__list");
  items.forEach((item) => {
    item.parentNode.removeChild(item);
  });
}

const changeIcons = () => {
  let valueSearch = inputSearch.value;
  if (valueSearch.length > 0) {
    btnSearch.style.left = "1.3125em";
    btnSearchOff.style.visibility = "visible";
  }
  else if (valueSearch.length === 0){
    btnSearch.style.left = "initial";
    btnSearchOff.style.visibility = "hidden";
  }
};

export const cleanSearch = () => {
  inputSearch.value = '';
  inputSearch.focus();
  btnSearch.style.left = "initial";
  btnSearchOff.style.visibility = "hidden";
};

export const validateExistingId = (getId) => {
  const getLocalStorage = JSON.parse(localStorage.getItem("dbFavorites")) || [];
  getLocalStorage.forEach( e => {
    if (e.id === getId.id) {
      getId.classList.add("fas");
      getId.classList.remove("far");
    } else {
      getId.classList.add("far");
    }
  });
};