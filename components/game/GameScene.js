import * as Phaser from "phaser";
import Player from '@/components/game/classes/Player';
import ExampleEnemy from '@/components/game/classes/ExampleEnemy';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("map", "map.jpg");
  }

  create() {
    this.map = this.add.image(0, 0, "map");
    this.map.setOrigin(0.5, 0.5);
    this.map.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);

    // Create player
    this.player = new Player(this, this.scale.width / 2, this.scale.height / 2, 'player')

    // Create enemy
    this.enemy = new ExampleEnemy(this, this.scale.width / 2, this.scale.height / 2, 'enemy');

    this.cameras.main.startFollow(this.player);
    
    this.input.mouse.disableContextMenu();
    this.pointer = this.input.activePointer;
    
  }

  update(time, delta) {
    // Update player
    this.player.update(this.input.keyboard.createCursorKeys(), this.pointer);

    // Update enemy
    this.enemy.update(this.player.getPosition());
  }
}
