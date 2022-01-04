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

const total = `
total: 110 / 100

1. Вёрстка валидная +10
2. Вёрстка семантическая +20
    В коде странице присутствуют следующие элементы:
    2.1 <header>, <main>, <footer> +2
    2.2 шесть элементов <section> +2
    2.3 только один заголовок <h1> +2
    2.4 пять заголовков <h2>  +2
    2.5 один элемент <nav> +2
    2.6 два списка ul > li > a (панель навигации, ссылки на соцсети) +2
    2.7 десять кнопок <button> +2
    2.8 два инпута: <input type="email"> и <input type="tel"> +2
    2.9 один элемент <textarea> +2
    2.10 три атрибута placeholder +2
3. Вёрстка соответствует макету +48
    3.1 блок <header> +6
    3.2 секция hero +6
    3.3 секция skills +6
    3.4 секция portfolio +6
    3.5 секция video +6
    3.6 секция price +6
    3.7 секция contacts +6
    3.8 блок <footer> +6
4. Требования к css + 12
    4.1 для построения сетки используются флексы +2
    4.2 при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
    4.3 фоновый цвет тянется на всю ширину страницы +2
    4.4 иконки добавлены в формате .svg +2
    4.5 изображения добавлены в формате .jpg +2
    4.6 есть favicon +2
5. Интерактивность, реализуемая через css +20
    5.1 плавная прокрутка по якорям +5
    5.2 ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5
    5.3 интерактивность кнопки и иконки как в макете  +5
    5.4 плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5
`;

console.log(total);
