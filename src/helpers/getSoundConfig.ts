const musicArray = [
  {
    key: 'music',
    filePath: './audio/music/arab-and-muslim-190765.mp3',
    loop: true,
    isMusic: true,
  },
  {
    key: 'music',
    filePath: './audio/music/gypsy-animated-music-252548.mp3',
    loop: true,
    isMusic: true,
  },
  {
    key: 'music',
    filePath: './audio/music/punch-deck-brazilian-street-fight(chosic.com).mp3',
    loop: true,
    isMusic: true,
  },
  {
    key: 'music',
    filePath: './audio/music/the-queen-of-dunes-169012.mp3',
    loop: true,
    isMusic: true,
  },
];

const getRandomMusic = () => {
  return musicArray[Math.floor(Math.random() * musicArray.length)];
};

export const musicConfig = getRandomMusic();
