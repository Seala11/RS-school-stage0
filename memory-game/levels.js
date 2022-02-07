// TODO: add a list of random 15pict and choose each time different but the number of card you needed
// bad: easy level same cards each time;

const levelData = {
    easy: [
        { src: './assets/images/zebra.jpg', name: 'zebra' },
        { src: './assets/images/bug2.jpg', name: 'bug' },
        { src: './assets/images/cat3.jpg', name: 'cat' },
        { src: './assets/images/zebra.jpg', name: 'zebra' },
        { src: './assets/images/bug2.jpg', name: 'bug' },
        { src: './assets/images/cat3.jpg', name: 'cat' },
      ],
      medium: [
        { src: './assets/images/zebra.jpg', name: 'zebra' },
        { src: './assets/images/bug2.jpg', name: 'bug' },
        { src: './assets/images/cat3.jpg', name: 'cat' },
        { src: './assets/images/shark4.jpg', name: 'shark' },
        { src: './assets/images/dog5.jpg', name: 'dog' },
        { src: './assets/images/yellow3.jpg', name: 'lion' },
        { src: './assets/images/zebra.jpg', name: 'zebra' },
        { src: './assets/images/bug2.jpg', name: 'bug' },
        { src: './assets/images/cat3.jpg', name: 'cat' },
        { src: './assets/images/shark4.jpg', name: 'shark' },
        { src: './assets/images/dog5.jpg', name: 'dog' },
        { src: './assets/images/yellow3.jpg', name: 'lion' },
      ], 
      hard: [
        { src: './assets/images/zebra.jpg', name: 'zebra' },
        { src: './assets/images/bug2.jpg', name: 'bug' },
        { src: './assets/images/cat3.jpg', name: 'cat' },
        { src: './assets/images/shark4.jpg', name: 'shark' },
        { src: './assets/images/dog5.jpg', name: 'dog' },
        { src: './assets/images/yellow3.jpg', name: 'lion' },
        { src: './assets/images/white2.jpg', name: 'cat-white' },
        { src: './assets/images/red3.jpg', name: 'bird' },
        { src: './assets/images/green5.jpg', name: 'green' },
        { src: './assets/images/zebra.jpg', name: 'zebra' },
        { src: './assets/images/bug2.jpg', name: 'bug' },
        { src: './assets/images/cat3.jpg', name: 'cat' },
        { src: './assets/images/shark4.jpg', name: 'shark' },
        { src: './assets/images/dog5.jpg', name: 'dog' },
        { src: './assets/images/yellow3.jpg', name: 'lion' },
        { src: './assets/images/white2.jpg', name: 'cat-white' },
        { src: './assets/images/red3.jpg', name: 'bird' },
        { src: './assets/images/green5.jpg', name: 'green' }
      ]
}

// ===== load images to game section depending on the level =====

const loadRandomData = (level) => {
    const images = levelData[level];
    console.log(images)
    images.sort(() => Math.random() - 0.5);
    console.log(images)
    return images;
  };

  export default loadRandomData;