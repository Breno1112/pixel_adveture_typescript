import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scene: [MainScene],
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: "100%",
    height: "100%",
  },
  physics: {
    default: 'arcade'
  },
  autoRound: false
};

new Phaser.Game(config);

