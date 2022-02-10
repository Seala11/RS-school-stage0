const dataImages = [
  { src: './assets/images/1-coala.jpg', name: 'coala' },
  { src: './assets/images/2-panda.jpg', name: 'panda' },
  { src: './assets/images/3-bird-white-bg.jpg', name: 'white-bird' },
  { src: './assets/images/4-cat-blue-bg.jpg', name: 'cat-blue' },
  { src: './assets/images/5-iguana.jpg', name: 'iguana' },
  { src: './assets/images/6-flamingo.jpg', name: 'flamingo' },
  { src: './assets/images/7-white-bear.jpg', name: 'white-bear' },
  { src: './assets/images/8-bird-black-bg.jpg', name: 'bird-black' },
  { src: './assets/images/9-squirrel.jpg', name: 'squirrel' },
  { src: './assets/images/10-tiger.jpg', name: 'tiger' },
  { src: './assets/images/11-horse.jpg', name: 'horse' },
  { src: './assets/images/12-cat-gray-bg.jpg', name: 'cat-gray' },
  { src: './assets/images/13-bird-green-bg.jpg', name: 'bird-green' },
  { src: './assets/images/14-bug.jpg', name: 'bug' },
  { src: './assets/images/15-lizard.jpg', name: 'lizard' },
  { src: './assets/images/16-cat-pink-bg.jpg', name: 'cat-pink' },
  { src: './assets/images/17-frog.jpg', name: 'frog' },
  { src: './assets/images/18-red-bird.jpg', name: 'red-bird' },
  { src: './assets/images/19-shark.jpg', name: 'shark' },
  { src: './assets/images/20-zebra.jpg', name: 'zebra' },
  { src: './assets/images/21-cat-white-bg.jpg', name: 'cat-white' },
  { src: './assets/images/22-lion.jpg', name: 'lion' },
  { src: './assets/images/23-dog.jpg', name: 'dog' },
  { src: './assets/images/24-toucan.jpg', name: 'toucan' },
];

// ===== load images to game section depending on the level ======
// 1. we have 24 unique images (dataImages), shuffle them;
// 2. slice needed amount of cards (depending on level, set in CARD NUMBERS)
// 3. double the data to get pairs
// 4. shuffle again and return to the board;

const CARD_NUMBERS = {
  'easy': 3,    // board 3 * 2
  'medium': 6,  // board 3 * 4
  'hard': 8     // board 4 * 4
}

const loadRandomData = (level) => { 
  const cardNumbers = CARD_NUMBERS[level];
  const images = dataImages.sort(() => Math.random() - 0.5).slice(0, cardNumbers);
  const pairsImages = images.concat(images).sort(() => Math.random() - 0.5);
  
  return pairsImages;
};

export default loadRandomData;
