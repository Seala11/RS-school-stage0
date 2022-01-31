import showTask from './task.js';

// input section
const userInput = document.getElementById('search');
const searchBtn = document.querySelector('.btn-loupe');
const clearBtn = document.querySelector('.btn-cross');
//main section
const mainSection = document.getElementById('main');
const sectionGalery = document.getElementById('section-galery');
// modal pop up
const modal = document.querySelector('.main__modal');
const modalCloseBtn = modal.querySelector('.modal__close-btn');
const modalDownloadBtn = modal.querySelector('.modal__download-btn');

const ERROR_MESSAGE = {
  401: 'Unauthorised request.',
  403: 'Sorry. Try again later.',
  404: 'Your search did not match any image.',
  else: 'Oops! Something went wrong...',
};

const ERROR = {
  401: ' Invalid access key',
  403: ' For applications in demo mode, the Unsplash API currently places a limit of 50 requests per hour. Looks like you have reached the limit. Try again in one hour.',
  404: ' The image that you are looking for does not found',
  else: 'Something went wrong, status code: ',
};

let inputData = []; // to show-hide clear btn in clearBtnToggle

// search bar handler
const inputHandler = (event) => {
  if (event.key === 'Enter') searchHandler();
};

const searchHandler = () => {
  let searchKey = userInput.value;
  if (searchKey.trim() !== '') {
    makeRequest(searchKey);
    clearMainSection();
  }
};

const makeRequest = async (searchKey) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchKey}&per_page=30&client_id=IzymClZpgZ906XDwWPSawOkxCO6lu0NrULHFhjj9KFc`
    );
    const status = response.status;

    if (status === 200) {
      const data = await response.json();
      if (data.total === 0) showError('', ERROR_MESSAGE['404']);
      loadImages(data);
    } else if (status === 401) {
      showError(status, ERROR_MESSAGE[status]);
      throw Error(status + ERROR[status]);
    } else if (response.status === 403) {
      showError(status, ERROR_MESSAGE[status]);
      throw Error(status + ERROR[status]);
    } else if (response.status === 404) {
      showError(status, ERROR_MESSAGE[status]);
      throw Error(status + ERROR[status]);
    } else {
      showError(status, ERROR_MESSAGE['else']);
      throw Error(ERROR['else'] + status);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadImages = (data) => {
  data.results.forEach((element) => {
    let image = document.createElement('div');
    image.className = 'main__img';
    image.style.backgroundImage = `url(${element.urls.raw}&w=1366&h=768)`;
    image.addEventListener('click', () => modalHandler(element));
    sectionGalery.appendChild(image);
  });
};

// modal handler
const modalHandler = (element) => {
  modal.classList.add('modal__open');
  sectionGalery.classList.add('block-hidden');

  // set image inside modal
  modalImageHandler(element);

  //add image description (modal footer)
  modalDescHandler(element);

  // add link to download btn (will open the pict in new tab);
  modalDownloadBtn.href = element.links.download;
};

const modalImageHandler = (element) => {
  const imgEl = document.querySelector('.modal__image');
  imgEl.src = `${element.urls.raw}&w=1366&h=768`;
  imgEl.alt = element.alt_description;
  imgEl.width = element.width;
  imgEl.height = element.height;
  modal.appendChild(imgEl);
};

const modalDescHandler = (element) => {
  const descripEl = document.querySelector('.modal__desc');
  const userName = descripEl.querySelector('.desc_user');
  const userImg = descripEl.querySelector('.user_img');
  const descPhoto = descripEl.querySelector('.desc_photo');

  // add photographer name if exist
  element.user.name === null
    ? (userName.innerText = '')
    : (userName.innerText = element.user.name);
  userName.href = element.user.links.html;

  // add photographer image if exist or set deafault image
  element.user.profile_image.medium === null
    ? (userImg.style.backgroundImage = `url(./assets/svg/no-image.jpg)`)
    : (userImg.style.backgroundImage = `url(${element.user.profile_image.medium})`);
  userImg.style.backgroundImage = `url(${element.user.profile_image.medium})`;

  // add phote description if exist
  element.description === null
    ? (descPhoto.innerText = '')
    : (descPhoto.innerText = `"${element.description}"`);
};

const closeModal = () => {
  modal.classList.remove('modal__open');
  sectionGalery.classList.remove('block-hidden');
};

const clearMainSection = () => {
  sectionGalery.innerHTML = '';
};

// error handler
const showError = (status, message) => {
  let error = document.createElement('div');
  error.className = 'main__img';
  error.style.cursor = 'default';
  error.innerHTML = `
    <h1>${status > 0 ? status : ''}</h1>
    <p>${message}</p>
    `;
  sectionGalery.appendChild(error);
};

// clear Input and reset the search data (dataInput)
const clearInput = () => {
  userInput.value = '';
  clearBtn.classList.add('hidden');
  inputData = [];
};

// check if input is empty to show clear btn
const clearBtnToggle = (event) => {
  let inputChar = event.data;
  if (inputChar == null) {
    inputData.pop();
  } else {
    inputData.push(inputChar);
  }

  inputData.length > 0
    ? clearBtn.classList.remove('hidden')
    : clearBtn.classList.add('hidden');
};

// On load show random pictures
makeRequest('random');

// Set cursor in the input on load
userInput.focus();
userInput.select();

userInput.addEventListener('input', clearBtnToggle);
userInput.addEventListener('keydown', inputHandler);
searchBtn.addEventListener('click', searchHandler);
clearBtn.addEventListener('click', clearInput);
modalCloseBtn.addEventListener('click', closeModal);

showTask();
