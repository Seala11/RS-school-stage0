import {currentScore, currentMoves, restartScore} from "../componenets/cardLogic.js"

// ===================== LOCAL STORAGE ====================
const heightScore = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(heightScore);
const MAX_HEIGH_SCORE = 10; // the value of scores to show in the high score table;

const saveScoreToLocalStorage = () => {
  let lastScore = Math.floor(currentScore - currentMoves / 10);
  const score = {
    score: lastScore,
    moves: currentMoves,
  };
  heightScore.push(score);
  heightScore.sort((a, b) => b.score - a.score);
  heightScore.splice(MAX_HEIGH_SCORE);
  localStorage.setItem('highScores', JSON.stringify(heightScore));
  console.log(heightScore);
  restartScore();
};

export {saveScoreToLocalStorage};