const handleClick = (event) => {
  let element = event.target;

  if (element.classList.contains('button--submit') || element.classList.contains('icons')) {
    preventDefault(event);
  }
};

const preventDefault = (event) => {
  event.preventDefault();
};

if (document.addEventListener) {
  document.addEventListener('click', handleClick, false);
}
