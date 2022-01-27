import showTask from './task.js';

const userInput = document.getElementById('search');
const mainSection = document.querySelector('.main');
const searchBtn = document.querySelector('.btn-loupe');
const clearBtn = document.querySelector('.btn-cross');

const ERROR_MESSAGE = {
  401: 'Unauthorised request',
  404: 'Your search did not match any image',
  else: 'Oops! Something went wrong...',
};

const ERROR = {
  401: ' Invalid access key',
  404: ' The image that you are looking for does not found',
  else: 'Something went wrong, status code: ',
};

let inputData = []; // to show-hide clear btn in clearBtnToggle

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
    mainSection.appendChild(image);
  });
};

const clearMainSection = () => {
  mainSection.innerHTML = '';
};

const showError = (status, message) => {
  let error = document.createElement('div');
  error.className = 'main__img';
  error.innerHTML = `
    <h1>${status > 0 ? status : ''}</h1>
    <p>${message}</p>
    `;
  mainSection.appendChild(error);
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
// showTask();
