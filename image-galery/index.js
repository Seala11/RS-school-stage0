import showTask from './task.js';

const userInput = document.getElementById('search');
const mainSection = document.querySelector('.main');
const searchBtn = document.querySelector('.search-box__btn');

const inputHandler = (event) => {
  if (event.key === 'Enter') searchHandler();
};

const searchHandler = () => {
  clearMainSection();
  let searchKey = userInput.value;
  if (searchKey.trim() !== '') makeRequest(searchKey);
};

const makeRequest = async (searchKey) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchKey}&per_page=30&client_id=IzymClZpgZ906XDwWPSawOkxCO6lu0NrULHFhjj9KFc`
    );
    const status = response.status;

    if (status === 200) {
      const data = await response.json();
      if (data.total === 0) showError('', ERRORS['404']);
      loadImages(data);
    } else if (status === 401) {
      showError(status, ERRORS[status]);
      throw Error('Invalid access key');
    } else if (response.status === 404) {
      console.log(status, 'The image that you are looking for does not exist');
      showError(status, ERRORS[status]);
    } else {
      console.log('Something went wrong, status code: ' + response.status);
      showError(status, ERRORS['else']);
    }
  } catch (error) {
    console.log(error);
  }
};

const ERRORS = {
  401: 'Unauthorised request',
  404: 'You search did not match any image.',
  else: 'Oops! Something went wrong...',
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

// loadImages();
userInput.addEventListener('keydown', inputHandler);
searchBtn.addEventListener('click', searchHandler);
// showTask();
