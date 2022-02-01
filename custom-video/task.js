const task = `
## Требования
1. Вёрстка +10
   - вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5
   - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Кнопка Play/Pause на панели управления +10
   - при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5
   - внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5
3. Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10
4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10
5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10
6. Кнопка Play/Pause в центре видео +10
   - есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5
   - когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
   - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо 
   -> (добавлено "текущее время воспроизведения видео / общее время видео" в панель управления)

Total: 70 / 60;
`;

const showTask = () => {
    console.log(task);
}

export default showTask;
