const soundConfigs = [
  {
    key: 'music-1',
    filePath: './audio/music/arab-and-muslim-190765.mp3',
    loop: true,
    isMusic: true,
    baseVolume: 0.5,
  },
  {
    key: 'music-2',
    filePath: './audio/music/gypsy-animated-music-252548.mp3',
    loop: true,
    isMusic: true,
    baseVolume: 0.5,
  },
  {
    key: 'music-3',
    filePath: './audio/music/punch-deck-brazilian-street-fight(chosic.com).mp3',
    loop: true,
    isMusic: true,
    baseVolume: 0.5,
  },
  {
    key: 'music-4',
    filePath: './audio/music/the-queen-of-dunes-169012.mp3',
    loop: true,
    isMusic: true,
    baseVolume: 0.5,
  },
];

const preload = (scene: Phaser.Scene) => {
  soundConfigs.forEach(({ key, filePath }) => scene.load.audio(key, filePath));
};

const addSound = (scene: Phaser.Scene, key: string) => {
  const config = soundConfigs.find((config) => config.key === key);
  if (!config) throw new Error(`Could not find ${key} in audio configs`);
  const { loop, baseVolume } = config;
  const soundConfig = {
    volume: baseVolume,
    loop,
  } as Phaser.Types.Sound.SoundConfig;
  scene.sound.add(key, soundConfig);
};

// const toggleMuteSFX = (scene: Phaser.Scene) => {};

const toggleMuteMusic = (scene: Phaser.Scene) => {
  scene.sound.getAll('');
};

export { preload, addSound, toggleMuteSFX, toggleMuteMusic };
