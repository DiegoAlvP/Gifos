import {
  viewRepeatCatch,
  viewStartRecord,
  resetRecording,
  viewRecord
 } from "../create-my-gifos/style-actions-for-mygifos.js";
 import {
  getStream,
  recordVideo,
  stopVideo,
  stopTime,
  uploadVideo,
  openGifInLink,
  downloadGif
  } from "../create-my-gifos/create-gifos-main.js";

const btnStartRecord = document.getElementById('btn-start');
const btnRepeatCatch = document.getElementById('repeat-catch');
const btnRecord = document.getElementById('btn-record');
const btnFinish = document.getElementById('btn-finish');
const btnUpload = document.getElementById('btn-upload');
const btnStepOne = document.getElementById('step-one');
const btnDowload = document.querySelector('.create-gifos__buttons-dowload');
const btnLink = document.querySelector('.create-gifos__buttons-link');


export const startCreateMyGifos = () => {
  btnRepeatCatch.addEventListener('click', (event) => {
    event.preventDefault();
    viewRepeatCatch();
    getStream();
    stopTime();
  });

  btnStartRecord.addEventListener('click', (event) => {
    event.preventDefault();
    viewStartRecord();
    getStream();
  });

  btnStepOne.addEventListener('click', (event) => {
    event.preventDefault();
    resetRecording();
    getStream();
    stopTime();
  });

  btnRecord.addEventListener('click', (event) => {
    event.preventDefault();
    recordVideo();
    viewRecord();
  });

  btnFinish.addEventListener('click', (event) => {
    event.preventDefault();
    stopVideo();
  });

  btnUpload.addEventListener('click', (event) => {
    event.preventDefault();
    uploadVideo();
  });

  btnDowload.addEventListener('click', (event) => {
    event.preventDefault();
    downloadGif();
  });

  btnLink.addEventListener('click', (event) => {
    event.preventDefault();
    openGifInLink(event);
  });
};