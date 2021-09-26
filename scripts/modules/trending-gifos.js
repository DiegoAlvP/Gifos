import { getData } from "../connectionApi.js";
import { validateExistingId } from "./trending.js";

const trendsGifosContainerCards = document.querySelector(".trending-gifos__container-cards");
const trendsGifosGifcards = document.querySelector(".trending-gifos__gifcards");
const bntPrevious = document.getElementById("previous");
const btnNext = document.getElementById("next");
const optionCard = document.querySelector(".optioncard");
const optionCardUser = document.querySelector(".optioncard__user");
const optionCardTitle = document.querySelector(".optioncard__title");

export const trendingGifos = async () => {
  const data = await getData ("trending");
  await paintResultTrends(data.data);
};

const paintResultTrends = (getData) => {
  let cleanOptionCard = trendsGifosGifcards.childNodes[1];
  if (cleanOptionCard) cleanOptionCard.remove();
  const fragment = document.createDocumentFragment();
  trendsGifosContainerCards.innerHTML = "";
  getData.map((data) => {
    optionCardUser.textContent = data.username || "No user";
    optionCardTitle.textContent = data.title || "No title";
    const itemsClone = trendsGifosGifcards.cloneNode(true);
    const itemsOptionCard = optionCard.cloneNode(true);
    let cloneCard = itemsOptionCard.childNodes[1].firstElementChild.firstElementChild;
    cloneCard.id = data.id;
    cloneCard.classList.add("far");
    const itemImage = document.createElement("img");
    itemImage.classList.add("trending-gifos__itemsimg");
    itemImage.src = data.images.fixed_height.url;
    itemImage.id = data.id;
    itemImage.user = data.username || "No user";
    itemImage.title = data.title || "No title";
    itemImage.alt = data.title;
    itemsClone.appendChild(itemsOptionCard);
    itemsClone.appendChild(itemImage);
    fragment.appendChild(itemsClone);
    validateExistingId(cloneCard);
  });
  trendsGifosContainerCards.appendChild(fragment);
};

btnNext.addEventListener("click", () => {
  trendsGifosContainerCards.scrollLeft += 550;
});
bntPrevious.addEventListener("click", () => {
  trendsGifosContainerCards.scrollLeft -= 550;
});