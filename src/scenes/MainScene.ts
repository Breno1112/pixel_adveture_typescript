import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('tiles', './assets/tiles.png');
    this.load.tilemapTiledJSON('map', './assets/map.json');
    this.load.spritesheet('player', './assets/player.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles');
    if (tileset == null) {
      return;
    }
    map.createLayer('Background', tileset, 0, 0);

    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setCollideWorldBounds(true);

    let newCursors = this.input.keyboard?.createCursorKeys();
    if (newCursors != null) {
      this.cursors = newCursors;
    }
  }

  update() {
    this.teste(); 
    if (!this.cursors) return;
   

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player?.body?.blocked?.down) {
      this.player.setVelocityY(-300);
    }
  }

  teste() {
    console.log("teste maninho");
  }
}

