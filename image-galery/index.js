import showTask from './task.js';

const userInput = document.getElementById('search');
const mainSection = document.querySelector('.main');

const inputHandler = (event) => {
  if (event.key === 'Enter') loadImages();
};

const loadImages = async () => {
  clearMainSection();

  let searchKey = userInput.value;

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${searchKey}&client_id=IzymClZpgZ906XDwWPSawOkxCO6lu0NrULHFhjj9KFc`
    );
    console.log(response);

    // if the response is correct:
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      console.log(data.urls.regular)

      mainSection.innerHTML = `<img src=${data.urls.regular}></img>`;
    } else if(response.status === 401){
        console.log('The key is wrong');
    } else if(response.status === 404){
        console.log('The image that you are looking for does not exist');
    } else {
        console.log('Something went wrong');
    }
  } catch (error) {
    // if 404 => {errors: Array(1)}
    // errors: ['No photos found.']
    // [[Prototype]]: Object
    console.log(error);
  }
};

const clearMainSection = () => {
  mainSection.innerHTML = '';
};

// loadImages();
userInput.addEventListener('keydown', inputHandler);
// showTask();
