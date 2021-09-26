export const downloadFavOptionCard = async (getImage) => {
  const getGifUlr = getImage.src;
  const getGifTitle = getImage.title;
  const gifName = getGifTitle.replace(/ /g, "_");

  const gifUrl = await fetch(getGifUlr);
  const gifBlob = await gifUrl.blob();
  const resultUlrGif = URL.createObjectURL(gifBlob);
  const gifLink = document.createElement("a");
  gifLink.href = resultUlrGif;
  gifLink.download = `${gifName}.gif`;
  document.body.appendChild(gifLink);
  gifLink.click();
  document.body.removeChild(gifLink);
};