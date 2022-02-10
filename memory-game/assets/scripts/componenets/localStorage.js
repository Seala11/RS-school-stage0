import {currentScore, currentMoves, restartScore} from "../componenets/cardLogic.js"

// ===================== LOCAL STORAGE ====================
const highScore = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HEIGH_SCORE = 10; // the value of scores to show in the high score table;

const saveScoreToLocalStorage = () => {
  const score = {
    score: currentScore,
    moves: currentMoves,
  };
  highScore.push(score);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(MAX_HEIGH_SCORE);
  localStorage.setItem('highScores', JSON.stringify(highScore));
  restartScore();
};

export {saveScoreToLocalStorage, highScore};