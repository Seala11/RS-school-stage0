import showTask from './task.js';
// 0. add favicon)
// 1. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры
// 2. Игра завершается, когда открыты все карточки
// 3. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры
// 4. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр
// 5. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки переварачиваются

const gameSection = document.querySelector('.grid');
const playerLivesCounter = document.querySelector('.controls__score-counter');
let playerLives = 3;

// ===== show lives in controls section ======
playerLivesCounter.textContent = playerLives;

// ===== load images to game section =====
// TODO: make 3 levels different module for each data
// resize images
// this one is 4 on 4
const getImages = () => [
  { src: './assets/images/zebra.jpg', name: 'zebra' },
  { src: './assets/images/bug2.jpg', name: 'bug' },
  { src: './assets/images/cat3.jpg', name: 'cat' },
  { src: './assets/images/shark4.jpg', name: 'shark' },
  { src: './assets/images/dog5.jpg', name: 'dog' },
  { src: './assets/images/yellow3.jpg', name: 'lion' },
  { src: './assets/images/white2.jpg', name: 'cat-white' },
  { src: './assets/images/red3.jpg', name: 'bird' },
  { src: './assets/images/zebra.jpg', name: 'zebra' },
  { src: './assets/images/bug2.jpg', name: 'bug' },
  { src: './assets/images/cat3.jpg', name: 'cat' },
  { src: './assets/images/shark4.jpg', name: 'shark' },
  { src: './assets/images/dog5.jpg', name: 'dog' },
  { src: './assets/images/yellow3.jpg', name: 'lion' },
  { src: './assets/images/white2.jpg', name: 'cat-white' },
  { src: './assets/images/red3.jpg', name: 'bird' },
];

const loadRandomData = () => {
  const images = getImages();
  images.sort(() => Math.random() - 0.5);
  return images;
};

// ============= set random cards in the main section ================

const cardGenerator = () => {
  const cards = loadRandomData();
  cards.forEach((card, index) => {
    // create a card element with face and back;
    const cardEl = document.createElement('div');
    const cardFace = document.createElement('div');
    const cardBack = document.createElement('div');
    cardEl.classList = 'card';
    cardFace.classList = 'card-face';
    cardBack.classList = 'card-back';

    // add img to the card face
    cardFace.style.backgroundImage = `url(${card.src})`;
    cardEl.setAttribute('id', index); // not to match the same card
    cardEl.setAttribute('name', card.name); // to match names

    // add card element to the main section
    gameSection.appendChild(cardEl);
    cardEl.appendChild(cardFace);
    cardEl.appendChild(cardBack);

    // add events to the card
    cardEl.addEventListener('click', (event) => cardHandler(event));
  });
};

// ================== card flipping logic ==================

let firstCardName; // the first card id to check the match
let currentCardsId = []; // to check if those are different cards
let currentCards = []; // to remove the style from chosen elements

const cardHandler = (event) => {
  // if the same card clicked || opened card is clicked || there are 2 cards already opened
  const cardId = event.target.parentNode.getAttribute('id');
  if (currentCardsId.includes(cardId) || currentCardsId.length === 2) return;

  // save new card id to prevent reopening
  currentCardsId.push(cardId);

  // get the name to check the match
  const card = event.target.parentNode;
  const cardName = card.getAttribute('name');

  // flip the card and save the el to remove styles after
  flipToggle(card);
  currentCards.push(card);

  if (!firstCardName) {
    // if there are no opened cards, save the name of the first card
    firstCardName = cardName;
  } else {
    // if we already have one card opened, check if they match and set timer for the second card animation to be done (600ms)
    let matched = checkIfMatch(cardName);
    console.log(matched);
    matched === false
      ? setTimeout(flipCardsBack, 1400) // more time for 2 cards stayed both opened for 800ms
      : setTimeout(removeMatchedCards, 1000); // add 400ms before cards disapppear
  }
};

const flipToggle = (item) => {
  item.classList.toggle('card-flip');
};

const checkIfMatch = (secondCardName) => {
  // check if those are different elements with the same name
  const match =
    firstCardName === secondCardName && currentCardsId[0] !== currentCardsId[1];
  firstCardName = null;
  return match;
};

const flipCardsBack = () => {
  currentCards.forEach((el) => flipToggle(el));
  console.log('flipback');
   // after flip back elements, remove chosen elements so the player continue
   // the timer needed to flip animation be done;
  setTimeout(clearPlayerChoice, 600);
};

const removeMatchedCards = () => {
  currentCards.forEach((el) => el.classList.add('fixed'));
  console.log('matched');
  // after fixing elements, remove chosen elements so the player continue
  clearPlayerChoice();
};

const clearPlayerChoice = () => {
  currentCards = [];
  currentCardsId = [];
  console.log('done');
};

cardGenerator();

// showTask();
