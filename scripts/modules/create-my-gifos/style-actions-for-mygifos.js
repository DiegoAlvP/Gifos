const btnStartRecord = document.getElementById('btn-start');
const btnRecord = document.getElementById('btn-record');
const btnFinish = document.getElementById('btn-finish');
const btnUpload = document.getElementById('btn-upload');
const containerInitialInformation = document.querySelector('.create-gifos__container-initial-information');
const containerCameraAccess = document.querySelector('.create-gifos__container-camera-access');
const containerCameraActive = document.querySelector('.create-gifos__container-camera-active');
const btnStepOne = document.getElementById('step-one');
const btnStepTwo = document.getElementById('step-two');
const btnStepThree = document.getElementById('step-three');
const containerCardStatus = document.querySelector('.create-gifos__container-card-status');
const uploadingGifo = document.querySelector('.create-gifos__status-loading');
const uploadedGifo = document.querySelector('.create-gifos__status-loaded');
const timeCounter = document.querySelector('.create-gifos__time-counter');
const repeatCatch = document.querySelector('.create-gifos__repaet-catch');

export const viewInitialInformation = () => {
  containerInitialInformation.style.display = 'flex';
  containerCameraAccess.style.display = 'none';
  btnStepOne.style.background = '#FFFFFF';
  btnStepOne.style.color = '#572EE5';
  btnStartRecord.style.display = 'flex';
};

export const viewStartRecord = () => {
  containerInitialInformation.style.display = 'none';
  containerCameraAccess.style.display = 'flex';
  btnStepOne.style.background = '#572EE5';
  btnStepOne.style.color = '#FFFFFF';
  btnStartRecord.style.display = 'none';
};

export const viewRepeatCatch = () => {
  repeatCatch.style.display = 'none';
  btnStepTwo.style.background = '#572EE5';
  btnStepTwo.style.color = '#FFFFFF';
  btnUpload.style.display = 'none';
};

export const viewCameraAccess = () => {
  btnStepTwo.style.background = '#572EE5';
  btnStepTwo.style.color = '#FFFFFF';
  btnRecord.style.display = 'flex';
  btnStepOne.style.background = '#FFFFFF';
  btnStepOne.style.color = '#572EE5';
  btnStartRecord.style.display = 'none';
  containerInitialInformation.style.display = 'none';
  containerCameraAccess.style.display = 'none';
  containerCameraActive.style.display = 'flex';
};

export const viewRecord = () => {
  btnRecord.style.display = 'none';
  btnFinish.style.display = 'flex';
  timeCounter.style.display = 'flex';
  repeatCatch.style.display = 'none';
};

export const viewFinish = () => {
  btnUpload.style.display = 'flex';
  btnRecord.style.display = 'none';
  btnFinish.style.display = 'none';
  timeCounter.style.display = 'none';
  repeatCatch.style.display = 'flex';
};

export const viewUpload = () => {
  btnUpload.style.display = 'none';
  repeatCatch.style.display = 'none';
  btnStepThree.style.background = '#572EE5';
  btnStepThree.style.color = '#FFFFFF';
  btnStepTwo.style.background = '#FFFFFF';
  btnStepTwo.style.color = '#572EE5';
  uploadingGifo.style.display = 'flex';
};

export const gifoSuccessfullyUploaded = () => {
  uploadingGifo.style.display = 'none';
  uploadedGifo.style.display = 'flex';
};

export const resetRecording = () => {
  btnStepTwo.style.background = '#572EE5';
  btnStepTwo.style.color = '#FFFFFF';
  btnStepThree.style.background = '#FFFFFF';
  btnStepThree.style.color = '#572EE5';
  btnRecord.style.display = 'flex';
  containerCardStatus.style.display = 'none';
  uploadedGifo.style.display = 'none';
  btnUpload.style.display = 'none';
  btnFinish.style.display = 'none';
  repeatCatch.style.display = 'none';
};