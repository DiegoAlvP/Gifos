const urlUpload = "https://upload.giphy.com/v1/gifs";
const urlGetById = "https://media.giphy.com/media/";
const urlApi = "https://api.giphy.com/v1/gifs/";
const keyApi = "wQstgqEjT8CMXWLBnQm8rTXeSMsVf0dY";

export const apiConection = async (action, query, limit, offset) => {
  try {
    const getReques = await fetch(
      `${urlApi}${action}?api_key=${keyApi}&q=${query}&limit=${limit}&offset=${offset}`
    );
    const getUrl = await getReques.json();
    return getUrl;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const uploadDataGif = async (information) => {
  try {
    const getReques = await fetch(
      `${urlUpload}?api_key=${keyApi}&tags=MyGifs`, information
    );
    let requesJson = await getReques.json();
    return requesJson.data;
  } catch (error) {
    cconsole.log(`Error: ${error}`);
  }
};

export const downloadById = async (gifCreatedId) => {
  try {
    const getReques = await fetch(
      `${urlGetById}${gifCreatedId}/giphy.gif`
    );
    const resultBlob = await getReques.blob();
    return resultBlob;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getMygifosDataById = async (gifById) => {
  try {
    const getReques = await fetch(
      `${urlApi}${gifById}?api_key=${keyApi}`
    );
    const getUrlById = await getReques.json();
    return getUrlById;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getData = async (endpoint, queryData, count) => {
  try {
    const info = await apiConection(endpoint, queryData, count);
    return info;
  } catch (error) {
    console.log('Error '+error);
  }
};