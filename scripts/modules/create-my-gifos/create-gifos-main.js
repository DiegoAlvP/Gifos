import { uploadDataGif, downloadById } from "../../connectionApi.js";
import {
  viewCameraAccess,
  viewInitialInformation,
  viewFinish,
  viewUpload,
  gifoSuccessfullyUploaded
} from "../create-my-gifos/style-actions-for-mygifos.js";

const containerRecordVideo = document.querySelector('.create-gifos__record-video');
const containerCardStatus = document.querySelector('.create-gifos__container-card-status');
const timeCounter = document.querySelector('.create-gifos__time-counter');

let containerStream;
let recorder;
let gifBlob;
let gifCreatedId;
let gitCreatedUrl;
let interval;
let timerRefreshRate = 30;

export const getStream = async () => {
  try {
    const getCamera = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 480,
        height: 320
      }
    });
    viewCameraAccess();
    containerRecordVideo.srcObject = getCamera;
    containerStream = getCamera;
    containerRecordVideo.play();
  } catch(error) {
    viewInitialInformation();
    alert('Error al acceder a la camara...');
    console.log('Error ' + error);
  }
};

export const recordVideo = async () => {
  recorder = await RecordRTC(containerStream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
    },
  });
  initTime();
  recorder.startRecording();
  recorder.camera = containerStream;
};

export const stopVideo = async () => {
  viewFinish();
  try {
    await recorder.stopRecording(() => {
      gifBlob = recorder.getBlob();
      recorder.camera.getTracks()[0].stop();
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
  stopTime();
};

export const uploadVideo = async () => {
  containerCardStatus.style.display = 'flex';
  viewUpload();
  try {
    const form = new FormData();
    form.append('file', gifBlob, 'my_gif.gif');
    const information = {
      method: 'POST',
      body: form,
      json: true
    };
    let result = await uploadDataGif(information);
    gifCreatedId = result.id;
    gitCreatedUrl = `https://media.giphy.com/media/${gifCreatedId}/giphy.gif`;
    gifoSuccessfullyUploaded();
    await saveGif(gifCreatedId);
    stopTime();
  } catch (error) {
    console.log(error);
  }
};

const initTime = () => {
  let initialTime = Date.now();
  interval = setInterval(() =>{
    let currentTime = Date.now();
    let timeDiff = currentTime - initialTime;
    msFormat(timeDiff);
  }, timerRefreshRate);
};

const msFormat = (mSeconds) => {
  const sec = Math.floor((mSeconds / 1000) % 60);
  const min = Math.floor((mSeconds / (1000 * 60)) % 60);
  const hrs = Math.floor((mSeconds / (1000 * 60 * 60)) % 24);
  renderTime(hrs, min, sec);
};

const renderTime = (hrs, min, sec) => {
  hrs = hrs < 10 ? '0' + hrs : hrs;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  timeCounter.innerText = `${hrs}:${min}:${sec}`
};

const clearTimer = () => {
  let hrs = '00';
  let min = '00';
  let sec = '00';
  timeCounter.innerText = `${hrs}:${min}:${sec}`
};

export const stopTime = () => {
  clearInterval(interval);
  clearTimer();
};

const saveGif = async (gifCreatedId) => {
  const saveCreatedGif = (await JSON.parse(localStorage.getItem("dbMyGif"))) || [];
  saveCreatedGif.push(gifCreatedId);
  localStorage.setItem("dbMyGif", JSON.stringify(saveCreatedGif));
};

export const openGifInLink = () => {
  window.open(gitCreatedUrl);
};

export const downloadGif = async (event) => {
  const resultBlob = await downloadById(gifCreatedId);
  const resultGifUrl = URL.createObjectURL(resultBlob);
  const gifLink = document.createElement("a");
  gifLink.href = resultGifUrl;
  gifLink.download = `my_gif_${gifCreatedId}.gif`;
  document.body.appendChild(gifLink);
  gifLink.click();
  document.body.removeChild(gifLink);
};