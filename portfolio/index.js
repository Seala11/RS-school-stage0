//menu
const navigation = document.getElementById('primary-nav');
const navToggle = document.getElementById('nav-button');
const hamburgerIcon = document.querySelectorAll('.hamburger-icon');
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
    element.classList.contains('lang__link') ||
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

// changing portfolio images
const portfolioHandler = (event) => {
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

navigation.addEventListener('click', navLinksHandler);
navToggle.addEventListener('click', navHandler);
portfolioBtns.addEventListener('click', portfolioHandler);

// task complition:
const total = `
total: 75 / 85

1. Вёрстка соответствует макету. Ширина экрана 768px +48
   - блок <header> +6
   - секция hero +6
   - секция skills +6
   - секция portfolio +6
   - секция video +6
   - секция price +6
   - секция contacts +6
   - блок footer +6 
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15
   - нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
   - нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
   - нет полосы прокрутки при ширине страницы от 480рх до 320рх +5
3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22
   - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2   
   - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
   - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
   - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
   - бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
   - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
   - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4 
`;

// console.log(total);
