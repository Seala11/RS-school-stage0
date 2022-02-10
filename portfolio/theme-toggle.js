// set light-dark version on load without blink
const toggleModeFromTo = (curMode, setMode) => {
  document.querySelector('html').classList.remove(curMode);
  document.querySelector('html').classList.add(setMode);
};

const loadTheme = () => {
  const theme = localStorage.getItem('themeVersion');
  if (theme === 'dark') {
    toggleModeFromTo('light', 'dark');
  } else {
    toggleModeFromTo('dark', 'light');
  }
};

loadTheme();
