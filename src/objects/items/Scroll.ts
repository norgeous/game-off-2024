import { CC, CM } from '../../enums/CollisionCategories';
import { Room } from '../../scenes/Room';
import audio, { AudioConfigType } from '../Audio';
import Item, { ItemConfigType } from './Item';

const imageKeys = [
  'scroll1',
  'scroll2', 
  'scroll3',
  'scroll4',
  'scroll5',
  'scroll6',
  'scroll7',
  'scroll8',
]

const audioConfig: AudioConfigType[] = [
  {
    key: 'successs',
    filePath: 'assets/audio/success.mp3',
    loop: false,
  }
];

const config: ItemConfigType = {
  key: 'scroll1',
  scale: 0.1,
  collisionCategory: CC.item,
  collisionMask: CM.item,
  onPickUpCallBack: (item, _player) => {
    item.tween.stop();
    audio.playAudio('successs');
  },
};

class Scroll extends Item {
  constructor(scene: Room, x: number, y: number) {
    config.key = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    super(scene, x, y, config);

    this.tween = this.scene.tweens.add({
      targets: this.gameObject,
      y: y - 20,  
      duration: 500, 
      yoyo: true,  
      repeat: -1,  
      ease: 'Sine.easeInOut', 
    });
    audio.addToConfig(this.scene, audioConfig);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.audio('successs', 'assets/audio/success.mp3');
    imageKeys.forEach(key => {
      scene.load.image(key, 'assets/items/scrolls/' + key + '.png');  
    });
  }
}

export default Scroll;
