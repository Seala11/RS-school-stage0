'use strict';

import i18Obj from './translate.js';
import showTack from './task.js';

//menu
const navigation = document.getElementById('primary-nav');
const navToggle = document.getElementById('nav-button');
const hamburgerIcon = document.querySelectorAll('.hamburger-icon');
// lang-switcher
const langSwitcherRu = document.getElementById('ru');
const langSwitcherEn = document.getElementById('en');
//theme-switcher
const themeSwitcherBtn = document.querySelector('.theme-switcher-svg');
//portfolio gallery
const portfolioBtns = document.querySelector('.portfolio__buttons');

const SEASONS = ['winter', 'spring', 'summer', 'autumn'];

const WINTER_ALT = [
  'mooden house in the forest on the lake in winter',
  'little girl hugging a snowman',
  'winter road coveren with snow',
  'smiling woman with snow in her hands',
  'two wooden houses on the road covered with snow',
  'christmas portrait of two kids and parents',
];
const SPRING_ALT = [
  'spring sunset landscape',
  'little girl with spring flowers',
  'blooming tree',
  'young couple on front of the blooming tree',
  'alley with blooming trees',
  'an elderly couple dancing',
];
const SUMMER_ALT = [
  'girl with book under the tree',
  'a little boy with two calves',
  'parents with little kid in the rye',
  'summer landcape with tree and flowers',
  'smiling woman with big dog',
  'a hand holding summer flower',
];
const AUTUMN_ALT = [
  'kissing couple on wood background',
  'sunrise landscape with the horse',
  'little kid with gray hat playing on the ground',
  'landscape with green tree',
  'smiling couple',
  'woman making picture on her phone',
];

// buttons prevent default
const handleClick = (event) => {
  let element = event.target;

  if (
    element.classList.contains('button--submit') ||
    element.classList.contains('icons')
  ) {
    event.preventDefault();
  }
};

if (document.addEventListener) {
  document.addEventListener('click', handleClick, false);
}

// menu navigation
const navHandler = () => {
  const visibility = navigation.getAttribute('data-visible');
  if (visibility === 'false') {
    navigation.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
    iconToggle();
  } else {
    navigation.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
    iconToggle();
  }
};

const iconToggle = () => {
  hamburgerIcon[0].classList.toggle('cross1');
  hamburgerIcon[1].classList.toggle('cross2');
  hamburgerIcon[2].classList.toggle('cross3');
};

// close menu on link click;
const navLinksHandler = (event) => {
  if (event.target.classList.contains('nav__link')) {
    navHandler();
  }
};

// language swither
const langSwitcherHandler = (event) => {
  const button = event.target;
  const lang = event.target.id;
  if (!button.classList.contains('lang-switcher--active')) {
    buttonActiveToggle(langSwitcherEn, langSwitcherRu);
    getTranslate(lang);
    setLanguage(lang);
  }
};

const buttonActiveToggle = (...elements) => {
  elements.forEach((el) => el.classList.toggle('lang-switcher--active'));
};

const getTranslate = (lang) => {
  const dataEl = document.querySelectorAll('[data-i18]');
  const vocab = i18Obj[lang];

  dataEl.forEach((el) => {
    const attr = el.dataset.i18;
    el.textContent = vocab[attr];
    if (el.placeholder) el.placeholder = vocab[attr];
  });
};

const setLanguage = (lang) => {
  localStorage.setItem('language', `${lang}`);
};

// light-dark version switcher
const themeHandler = (event) => {
  const btn = event.target;
  const version = btn.dataset.version;
  if (version === 'dark') {
    setMode('dark', 'light');
    addMoonIcon(btn);
  } else {
    setMode('light', 'dark');
    addSunIcon(btn);
  }
};

const setMode = (removeMode, addMode) => {
  document.querySelector('html').classList.remove(removeMode);
  document.querySelector('html').classList.add(addMode);
  localStorage.setItem('themeVersion', addMode);
};

const addMoonIcon = (btn) => {
  if (btn.classList.contains('sun-icon')) btn.classList.remove('sun-icon');
  btn.classList.add('moon-icon');
  btn.setAttribute('data-version', 'light');
};

const addSunIcon = (btn) => {
  if (btn.classList.contains('moon-icon')) btn.classList.remove('moon-icon');
  btn.classList.add('sun-icon');
  btn.setAttribute('data-version', 'dark');
};

// changing portfolio images
const portfolioHandler = (event) => {
  if (event.target.classList.contains('portfolio__buttons')) return;
  const images = document.querySelectorAll('.portfolio__galery-item');
  const btn = event.target;
  if (btn.dataset.season === SEASONS[0])
    changeImage(SEASONS[0], images, WINTER_ALT);
  changeActiveButton(btn);
  if (btn.dataset.season === SEASONS[1])
    changeImage(SEASONS[1], images, SPRING_ALT);
  changeActiveButton(btn);
  if (btn.dataset.season === SEASONS[2])
    changeImage(SEASONS[2], images, SUMMER_ALT);
  changeActiveButton(btn);
  if (btn.dataset.season === SEASONS[3])
    changeImage(SEASONS[3], images, AUTUMN_ALT);
  changeActiveButton(btn);
};

const changeImage = (season, images, alt) => {
  images.forEach((img, index) => {
    img.src = `./assets/img/${season}/${index + 1}.jpg`;
    img.alt = alt[index];
  });
};

const changeActiveButton = (btn) => {
  const buttons = Array.from(portfolioBtns.children);
  buttons.forEach((btn) => {
    if (btn.classList.contains('button--active')) {
      btn.classList.remove('button--active');
    }
  });
  btn.classList.add('button--active');
};

// image preload
const preloadImages = () => {
  SEASONS.forEach((season) => {
    for (let i = 0; i < 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i + 1}.jpg`;
    }
  });
};

// local storage
const loadLandAndTheme = () => {
  const lang = localStorage.getItem('language');
  const theme = localStorage.getItem('themeVersion');
  if (lang === 'en') {
    getTranslate('en');
  } else {
    getTranslate('ru');
    buttonActiveToggle(langSwitcherEn, langSwitcherRu);
  }

  if (theme === 'dark') {
    setMode('light', 'dark');
  } else {
    setMode('dark', 'light');
    addMoonIcon(themeSwitcherBtn);
  }
};

loadLandAndTheme();
preloadImages();
navigation.addEventListener('click', navLinksHandler);
navToggle.addEventListener('click', navHandler);
langSwitcherRu.addEventListener('click', langSwitcherHandler);
langSwitcherEn.addEventListener('click', langSwitcherHandler);
themeSwitcherBtn.addEventListener('click', themeHandler);
portfolioBtns.addEventListener('click', portfolioHandler);
showTack();
