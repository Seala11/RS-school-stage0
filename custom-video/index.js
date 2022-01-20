const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const controlsPlayBtn = player.querySelector('.controls__play')

const togglePlay = (event) => {
   if (video.paused) {
      video.play();
   } else {
      video.pause();
   }
   playBtnToggle();
}

const playBtnToggle = () => {
   if (controlsPlayBtn.classList.contains('play-btn')) {
      controlsPlayBtn.classList.remove('play-btn');
      controlsPlayBtn.classList.add('pause-btn');
   } else {
      controlsPlayBtn.classList.remove('pause-btn');
      controlsPlayBtn.classList.add('play-btn');
   }
}

controlsPlayBtn.addEventListener('click', togglePlay);

const task = `
## Требования (60 /65)
1. Вёрстка, дизайн, UI +20
   - внешний вид приложения соответствует предложенному образцу или является его улучшенной версией +5
   - вёрстка адаптивная. Приложения корректно отображается и отсутствует полоса прокрутки при ширине страницы от 1920рх до 768рх +5
   - интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации +5
   - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса https://rs.school/images/rs_school_js.svg со ссылкой на курс(https://rs.school/js-stage0/ +5
2. Кнопка Play/Pause +10
   - есть кнопка Play/Pause при клике по которой можно запустить или остановить проигрывание видео +5
   - внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5
3. Есть прогресс-бар ползунок которого перемещается отображая прогресс проигрывания видео. При перемещении ползунка вручную меняется время текущего проигрывания видео +10
4. Есть кнопка Volume/Mute при клике по которой можно включить или отключить звук +10
5. Есть регулятор громкости звука +10
6. Функционал плеера соответствует демо или является его улучшенной версией  +5
`;

console.log(task);