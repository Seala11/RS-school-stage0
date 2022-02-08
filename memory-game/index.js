import showTask from './assets/scripts/task.js';
import loadRandomData from './assets/scripts/loadLevelsData.js';
import showWinMessage from './assets/scripts/winSection.js';

// 0. add favicon
// 4. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр
// TODO: make header looks like (memory game   score   menu);

const gameSection = document.getElementById('grid');
const playerScoreCounter = document.querySelector('.controls__score-counter');
const playerMovesCounter = document.querySelector('.controls__moves-counter');
const gameRestartSection = document.querySelector('.game__restart');
let currentScore = 0;
let currentMoves = 0;
let winningScore; // depends on the level (amount of cards)

// ============= CARD GENERATOR SECTION ================
const cardGenerator = (level) => {
  const cards = loadRandomData(level);
  winningScore = (cards.length / 2) * 10;
  gameSection.classList.remove('hidden');
  gameSection.classList.add('grid');
  gameSection.classList.add(`grid--${level}`);
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

// ================== CARD FLIPPING LOGIC ==================
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
    matched === false
      ? setTimeout(flipCardsBack, 1400) // more time for 2 cards stayed both opened for 800ms
      : setTimeout(removeMatchedCards, 1000); // add 400ms before cards disapppear
    setTimeout(movesUpdate, 800);
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
  // after flip back elements, remove chosen elements so the player continue
  // the timer needed to flip animation be done;
  setTimeout(clearPlayerChoice, 600);
};

const removeMatchedCards = () => {
  currentCards.forEach((el) => el.classList.add('fixed'));
  scoreUpdate();
  // after fixing elements, remove chosen elements so the player continue
  clearPlayerChoice();
};

const clearPlayerChoice = () => {
  currentCards = [];
  currentCardsId = [];
};

// ================ SCORE UPDATE & MOVES UPDATES ======================
const scoreUpdate = () => {
  currentScore += 10;
  playerScoreCounter.textContent = currentScore;
  if (currentScore === winningScore) showWinMessage();
};

const movesUpdate = () => {
  currentMoves += 1;
  playerMovesCounter.textContent = currentMoves;
};

// here was a local storage
// ===================== Local storage ====================
const heightScore = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(heightScore);
const MAX_HEIGH_SCORE = 10; // the value of scores to show in te table;

export const saveScoreToLocalStorage = () => {
  let lastScore = Math.floor(currentScore - currentMoves / 10);
  const score = {
    score: lastScore,
    moves: currentMoves,
  };
  heightScore.push(score);
  heightScore.sort((a, b) => b.score - a.score);
  heightScore.splice(5);
  localStorage.setItem('highScores', JSON.stringify(heightScore));
  console.log(heightScore);
  restartScore();
};

const restartScore = () => {
  currentScore = 0;
  currentMoves = 0;
  playerScoreCounter.textContent = currentScore;
  playerMovesCounter.textContent = currentMoves;
};

// ===================== App starts =======================
// we need to ask what level to load
// 1. easy 3 pairs = 2 * 3
// 2. medium 6 pairs = 3 * 4
// 3. hard 9 pairs = 3 * 6
// TODO: add to each level different style grid
// show on screen
const levelSection = document.querySelector('.game__start');

export const startGame = () => {
  // show choose level message and remove restart section if the game starts again
  if (levelSection.classList.contains('hidden'))
    levelSection.classList.remove('hidden');
  if (!gameRestartSection.classList.contains('hidden'))
    gameRestartSection.classList.add('hidden');

  const level = document.querySelectorAll('.button__level');
  level.forEach((element) =>
    element.addEventListener('click', (event) =>
      loadLevelBoard(event.target.id)
    )
  );
};

const loadLevelBoard = (level) => {
  levelSection.classList.add('hidden');
  cardGenerator(level);
};

startGame();

// showTask();
