import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

  preload() {

    this.load.image('tiles', 'src/assets/tilesets/Terrain (16x16).png');

    this.load.tilemapTiledJSON('map', 'src/assets/maps/level_1.json');

  }

  create() {
    const map = this.createMap();
    this.setupCamera(map!);
    this.setupPhysics(map!);

  }

  update() {
  }


  createMap(): Phaser.Tilemaps.Tilemap | undefined {
    const map = this.make.tilemap({
      key: 'map',
    })

    const tileset = map.addTilesetImage('terrain_tileset', 'tiles');

    if (tileset == null) {
      return
    }

    map.createLayer('Terrain', tileset, 0, 0);
    return map;
  }

  setupCamera(map: Phaser.Tilemaps.Tilemap) {

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    const scaleX = this.sys.game.canvas.width / map.widthInPixels;
    const scaleY = this.sys.game.canvas.height / map.heightInPixels;
    const scale = Math.min(scaleX, scaleY);

    this.cameras.main.setZoom(scale);
    this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);

  }

  setupPhysics(map: Phaser.Tilemaps.Tilemap) {

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    const objectsLayer = map.getObjectLayer('TerrainObjects');
    if (objectsLayer == null) {
      return;
    }
    const platforms = this.physics.add.staticGroup();
    objectsLayer.objects.forEach((item) => {
      const { x, y, width, height } = item;
      const rect = this.add.rectangle(
        x! + width! / 2, y! + height! / 2, width!, height!
      );
      rect.setDisplaySize(width!, height!);

      // to debug platforms use this
      rect.setFillStyle(0xff0000, 0.5); // semi-transparent red
      // end

      this.physics.add.existing(rect, true);
      platforms.add(rect);
    });
    // this.debugPlatforms(platforms);
  }

}







