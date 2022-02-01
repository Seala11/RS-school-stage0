import showTask from './task.js';
// 0. add favicon)
// 1. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры
// 2. Игра завершается, когда открыты все карточки
// 3. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры
// 4. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр
// 5. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки переварачиваются

const gameSection = document.querySelector('.game__section');
const playerLivesCounter = document.querySelector('.controls__score-counter');
let playerLives = 3;

// ===== show lives in controls section ======
playerLivesCounter.textContent = playerLives;

// ===== load images to game section =====
// TODO: make 3 levels different module for each data
// resize images
// this one is 4 on 4
const getImages = [
  {src: '.images/zebra.jpg', name: 'zebra'},
  {src: '.images/bug2.jpg', name: 'bug'},
  {src: '.images/cat3.jpg', name: 'cat'},
  {src: '.images/shark4.jpg', name: 'shark'},
  {src: '.images/dog5.jpg', name: 'dog'},
  {src: '.images/yellow3.jpg', name: 'lion'},
  {src: '.images/white2.jpg', name: 'cat-white'},
  {src: '.images/red3.jpg', name: 'bird'},
  {src: '.images/zebra.jpg', name: 'zebra'},
  {src: '.images/bug2.jpg', name: 'bug'},
  {src: '.images/cat3.jpg', name: 'cat'},
  {src: '.images/shark4.jpg', name: 'shark'},
  {src: '.images/dog5.jpg', name: 'dog'},
  {src: '.images/yellow3.jpg', name: 'lion'},
  {src: '.images/white2.jpg', name: 'cat-white'},
  {src: '.images/red3.jpg', name: 'bird'},
];

// showTask();
