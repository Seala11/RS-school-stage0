import { cardEvent, winningScore } from '../sections/gameSection.js';
import showWinMessage from '../sections/winSection.js';
import { playerMovesCounter, playerScoreCounter } from '../componenets/gameControls.js';

let currentScore = 0;
let currentMoves = 0;

// ================== CARD FLIPPING LOGIC ==================
let firstCardName; // the first card id to check the match
let currentCardsId = []; // to check if those are different cards
let currentCards = []; // to remove the style from chosen elements

const cardHandler = (cardEvent) => {
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

const restartScore = () => {
  currentScore = 0;
  currentMoves = 0;
  playerScoreCounter.textContent = currentScore;
  playerMovesCounter.textContent = currentMoves;
};

export { cardHandler, restartScore, currentScore, currentMoves };
