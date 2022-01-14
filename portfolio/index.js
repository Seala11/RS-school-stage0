'use strict';

import i18Obj from './translate.js';

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
    preventDefault(event);
  }
};

const preventDefault = (event) => {
  event.preventDefault();
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

    hamburgerIcon[0].classList.add('cross1');
    hamburgerIcon[1].classList.add('cross2');
    hamburgerIcon[2].classList.add('cross3');
  } else {
    navigation.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);

    hamburgerIcon[0].classList.remove('cross1');
    hamburgerIcon[1].classList.remove('cross2');
    hamburgerIcon[2].classList.remove('cross3');
  }
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
    setLightMode();
    addMoonIcon(btn);
  } else {
    setDarkMode();
    addSunIcon(btn);
  }
};

const setDarkMode = () => {
  document.querySelector('body').classList.remove('light');
  document.querySelector('body').classList.add('dark');
  localStorage.setItem('themeVersion', 'dark');
};

const setLightMode = () => {
  document.querySelector('body').classList.remove('dark');
  document.querySelector('body').classList.add('light');
  localStorage.setItem('themeVersion', 'light');
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
const langFromLocalStorage = () => {
  return localStorage.getItem('language');
};

const themeFromLocalStorage = () => {
  return localStorage.getItem('themeVersion');
};

const loadLandAndTheme = () => {
  const lang = langFromLocalStorage();
  const theme = themeFromLocalStorage();
  if (lang === 'en') {
    getTranslate('en');
  } else {
    getTranslate('ru');
    buttonActiveToggle(langSwitcherEn, langSwitcherRu);
  }

  if (theme === 'dark') {
    setDarkMode();
  } else {
    setLightMode();
    addMoonIcon(themeSwitcherBtn, 'light');
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

// task complition:
const total = `
total: 75 / 85

1. Смена изображений в секции portfolio +25  
   - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
   - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка +25  
   - при клике по надписи ru англоязычная страница переводится на русский язык +10
   - при клике по надписи en русскоязычная страница переводится на английский язык +10
   - надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы +25  
   - На страницу добавлен переключатель при клике по которому: 
      - тёмная тема приложения сменяется светлой +10
      - светлая тема приложения сменяется тёмной +10
      - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5  
5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5       
   - Box-shadow Button [Демо](https://codepen.io/wwer91/pen/wRWJme)

P.S: Я изменила расположение кнопок в навигации, т к расположение кнопки смены темы в макете не очень удачно, на мой взгляд. В ТЗ указано, что "разрешены и даже приветствуются правки размеров и расположения криво нарисованных блоков".

Спасибо, добрый человек, что проверил мою работу! От души прям! Успехов тебе!
`;

console.log(total);
