import {
  getDataList,
  compareValue,
  cleanSearch,
  seeMoreResults
} from "./modules/trending.js";

import { mainOption } from "./modules/optionCard/main-option.js";
import { darkMode } from "./components/dark-mode.js";
import { paintFavoriteCards, seeMoreFavorites } from "./modules/favorites.js";
import { paintMygifosCards, seeMoreMygifos } from "./modules/my-gifos.js";
import { seeHome, openCreateGifos } from "./modules/header.js";
import { trendingGifos } from "./modules/trending-gifos.js";
import { startCreateMyGifos } from "./modules/create-my-gifos/execute-actions-for-mygifos.js";

const inputSearch = document.querySelector(".search__text");
const btnSearch = document.querySelector(".search__icon");
const btnSearchOff = document.querySelector(".search__iconoff");
const btnSeeMore = document.querySelector(".search-trending__btnmore");
const btnFavorites = document.getElementById("btnFavorites");
const btnMygifos = document.getElementById("btnMygifos");
const btnSeeMoreFavorites = document.querySelector(".favorites__btnmore");
const btnSeeMoreMygifos = document.querySelector(".mygifos__btnmore");

async function run() {
  inputSearch.addEventListener("keyup", getDataList);
  btnSearch.addEventListener("click", compareValue);
  btnSearchOff.addEventListener("click", cleanSearch);
  btnSeeMore.addEventListener("click", seeMoreResults);
  btnFavorites.addEventListener("click", paintFavoriteCards);
  btnMygifos.addEventListener("click", paintMygifosCards);
  btnSeeMoreFavorites.addEventListener("click", seeMoreFavorites);
  btnSeeMoreMygifos.addEventListener("click", seeMoreMygifos);

  darkMode();
  mainOption();
  seeHome();
  openCreateGifos();
  trendingGifos();
  startCreateMyGifos();

}

run();