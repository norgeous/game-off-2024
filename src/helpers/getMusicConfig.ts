import { AudioConfigType } from '../objects/Audio';

const defaultSoundConfig: Phaser.Types.Sound.SoundConfig = {
  volume: 0.3,
};

const musicArray: AudioConfigType[] = [
  {
    key: 'music',
    filePath: './audio/music/arab-and-muslim-190765.mp3',
    loop: true,
    isMusic: true,
    roomType: '2',
    soundConfig: defaultSoundConfig,
  },
  {
    key: 'music',
    filePath: './audio/music/gypsy-animated-music-252548.mp3',
    loop: true,
    isMusic: true,
    roomType: '2',
    soundConfig: defaultSoundConfig,
  },
  {
    key: 'music',
    filePath: './audio/music/punch-deck-brazilian-street-fight(chosic.com).mp3',
    loop: true,
    isMusic: true,
    roomType: '2',
    soundConfig: defaultSoundConfig,
  },
  {
    key: 'bossMusic',
    filePath: './audio/music/the-queen-of-dunes-169012.mp3',
    loop: true,
    isMusic: true,
    roomType: 'b',
    soundConfig: defaultSoundConfig,
  },
];

const bossMusicArray = musicArray.filter((item) => item.roomType === 'b');
const roomMusicArray = musicArray.filter((item) => item.roomType !== 'b');

const getRandomMusicConfig = (musicConfigs: AudioConfigType[]) => {
  return musicConfigs[Math.floor(Math.random() * musicConfigs.length)];
};

const roomMusic = getRandomMusicConfig(roomMusicArray);
const bossMusic = getRandomMusicConfig(bossMusicArray);

export const getCurrentRoomMusic = (roomType: string): AudioConfigType => {
  return roomType === 'b' ? bossMusic : roomMusic;
};

export const musicConfig = [roomMusic, bossMusic];
