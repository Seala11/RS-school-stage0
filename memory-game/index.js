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
const getImages = () => ([
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
]);

const loadRandomData = () => {
  const images = getImages();
  images.sort(() => Math.random() - 0.5);
  return images;
};

const cardGenerator = () => {
  const cards = loadRandomData();
  cards.forEach(card => {
    // create a card element with face and back;
    const cardEl = document.createElement('div');
    const cardFace = document.createElement('div');
    const cardBack = document.createElement('div');
    cardEl.classList = 'card';
    cardFace.classList = 'card-face';
    cardBack.classList = 'card-back';

    // add img to the card face
    cardFace.style.backgroundImage = `url(${card.src})`;

    // add card element to the main section
    gameSection.appendChild(cardEl);
    cardEl.appendChild(cardFace);
    cardEl.appendChild(cardBack);
    
    // add events to the card
    cardEl.addEventListener('click', () => cardHandler(card, cardEl));
  })
}

const cardHandler = (cardInfo, cardEl) => {
  console.log(cardInfo.name)
  cardEl.classList.toggle('card-flip');
}

cardGenerator();

// showTask();
