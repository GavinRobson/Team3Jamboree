import * as Phaser from "phaser";
import Player from '@/components/game/classes/Player';
import ExampleEnemy from '@/components/game/classes/ExampleEnemy';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "Background_Map.json");
    this.load.image("tiles", "tilemap_packed.png");
  }

  create() {
    this.map = this.make.tilemap({key: "map", tileWidth: 16, tileHeight: 16});
    const tileset = this.map.addTilesetImage("tilemap_packed", "tiles");
    const grasslayer = this.map.createLayer("Grass", tileset, 0, 0);
    const roadlayer = this.map.createLayer("Roads", tileset, 0, 0);
    const schoollayer = this.map.createLayer("School background", tileset, 0, 0);
    const signallayer = this.map.createLayer("Signals", tileset, 0, 0);
    const trees1layer = this.map.createLayer("TreesLayer1", tileset, 0, 0);
    const trees2layer = this.map.createLayer("TreesLayer2", tileset, 0, 0);
    const trees3layer = this.map.createLayer("TreesLayer3", tileset, 0, 0);
    const windowandoorlayer = this.map.createLayer("Windows and Doors", tileset, 0, 0);


    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    // Create player
    this.player = new Player(this, this.scale.width / 2, this.scale.height / 2, 'player')

    // Create enemy
    this.enemy = new ExampleEnemy(this, this.scale.width / 2, this.scale.height / 2, 'enemy');

    this.cameras.main.startFollow(this.player);
    
    this.input.mouse.disableContextMenu();
    this.pointer = this.input.activePointer;
    
    //colliders for player
    this.physics.add.collider(this.player, trees1layer);
    trees1layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.player, trees2layer);
    trees2layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.player, trees3layer);
    trees3layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.player, schoollayer);
    schoollayer.setCollisionBetween(124, 211);
    this.physics.add.collider(this.player, signallayer);
    signallayer.setCollisionBetween(168, 411);

    //colliders for enemies
    this.physics.add.collider(this.enemy, trees1layer);
    trees1layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.enemy, trees2layer);
    trees2layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.enemy, trees3layer);
    trees3layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.enemy, schoollayer);
    schoollayer.setCollisionBetween(124, 211);
    this.physics.add.collider(this.enemy, signallayer);
    signallayer.setCollisionBetween(168, 411);
  }

  update(time, delta) {
    // Update player
    this.player.update(this.input.keyboard.createCursorKeys(), this.pointer);

    // Update enemy
    this.enemy.update(this.player.getPosition());
  }
}
