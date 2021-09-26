const btnMenu = document.querySelector(".header-nav__btn");
const btnMainLogo = document.querySelector(".header-nav__logo");
const btnCreateGifos = document.querySelector(".header-nav__btncreate");
const searchContainer = document.querySelector(".search");
const trendingContainer = document.querySelector(".search-trending");
const searchText = document.querySelector(".search__text");
const favoritesContainer = document.querySelector(".favorites");
const myGifosContainer = document.querySelector(".mygifos");
const createGifosContainer = document.querySelector(".create-gifos");
const trendingGifosContainer = document.querySelector(".trending-gifos");
const btnStartRecording = document.getElementById("btn-start");

export const seeHome = () => {
  btnMainLogo.addEventListener('click', () => {
    searchContainer.style.display = "flex";
    trendingContainer.style.display = "none";
    favoritesContainer.style.display = "none";
    myGifosContainer.style.display = "none";
    createGifosContainer.style.display = "none";
    trendingGifosContainer.style.display = "flex";
    btnMenu.checked = false;
    searchText.focus();
  });
};
export const openCreateGifos = () => {
  btnCreateGifos.addEventListener('click', () => {
    btnCreateGifos.style.background = '#9CAFC3';
    btnCreateGifos.style.color = '#FFFFFF';
    btnCreateGifos.style.border = '#FFFFFF';
    createGifosContainer.style.display = "flex";
    searchContainer.style.display = "none";
    trendingContainer.style.display = "none";
    favoritesContainer.style.display = "none";
    myGifosContainer.style.display = "none";
    trendingGifosContainer.style.display = "none";
    btnStartRecording.focus();
  });
};
