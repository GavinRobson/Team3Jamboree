import * as Phaser from "phaser";
import Player from '@/components/game/classes/Player';
import ExampleEnemy from '@/components/game/classes/ExampleEnemy';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  init(data) {
    this.userId = data.userId;
    console.log('User ID in GameScene:', this.userId);
  }
  preload() {
    this.load.tilemapTiledJSON("map", "Background_Map.json");
    this.load.image("tiles", "tilemap_packed.png");
    
    this.load.spritesheet("playerSprite", "Sprites/SimonWalk.png", {
      frameWidth: 16,
      frameHeight: 32,

    });

    this.load.spritesheet("paperSprite", "Sprites/paper.png", {
      frameWidth: 32,
      frameHeight: 32,

    });

    this.load.spritesheet("examSprite", "Sprites/ExamSpriteSheet.png", {
      frameWidth: 64,
      frameHeight: 64,

    });

    this.load.spritesheet('sodaSprite', 'Sprites/Soda.png', { 
      frameWidth: 225, 
      frameHeight: 225 
    });
    
  }

  create() {
    this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    const tileset = this.map.addTilesetImage("tilemap_packed", "tiles");
    
    // Calculate the offset needed to center the map horizontally
    const mapWidth = this.map.widthInPixels;
    const screenWidth = this.cameras.main.width;
    const horizontalOffset = (screenWidth - mapWidth) / 2;
    
    this.topText = this.add.text(horizontalOffset + 16, 16, 'Score: 0', { fontSize: '24px', fill: '#000000' })
    this.topText.setScrollFactor(0);
    this.topText.setDepth(10)
    // Create layers and shift them by the horizontal offset
    const grasslayer = this.map.createLayer("Grass", tileset, horizontalOffset, 0);
    const roadlayer = this.map.createLayer("Roads", tileset, horizontalOffset, 0);
    const schoollayer = this.map.createLayer("School background", tileset, horizontalOffset, 0);
    const signallayer = this.map.createLayer("Signals", tileset, horizontalOffset, 0);
    const trees1layer = this.map.createLayer("TreesLayer1", tileset, horizontalOffset, 0);
    const trees2layer = this.map.createLayer("TreesLayer2", tileset, horizontalOffset, 0);
    const trees3layer = this.map.createLayer("TreesLayer3", tileset, horizontalOffset, 0);
    const windowandoorlayer = this.map.createLayer("Windows and Doors", tileset, horizontalOffset, 0);

    this.physics.world.setBounds(horizontalOffset, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Pause functionality
    this.input.keyboard.on('keydown-P', () => {
      this.scene.pause();
      this.scene.launch('PauseMenu', { userId: this.userId });
    })

    this.pauseText = this.add.text(mapWidth - 80, 16, 'Press P to Pause', { fontSize: '24px', fill: '#000000' });
    this.pauseText.setScrollFactor(0)

    // Sets up the animation for the player.
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("playerSprite", {frames:[0, 1, 2, 3]}), 
      frameRate:8,
      repeat:-1,

    })



    // Create player
    

    this.player = new Player(this, this.scale.width / 2, this.scale.height / 2, 'playerSprite');
    this.player.setScale(1); // makes the player bigger.

    this.player.play("walk", true);
   

    /*
    this.player = this.add.Sprite(10, 10, "playerSprite");
    */

    // Setup animations for the enemy(s)

    this.anims.create({
      key: "walkPaper",
      frames: this.anims.generateFrameNumbers("paperSprite", {frames:[0, 1, 2, 3]}), 
      frameRate:8,
      repeat:-1,

    })

    this.anims.create({
      key: "walkExam",
      frames: this.anims.generateFrameNumbers("examSprite", {frames:[0, 1, 2]}), 
      frameRate:8,
      repeat:-1,

    })

    // Create enemy
    this.enemy = new ExampleEnemy(this, this.scale.width / 2, this.scale.height / 2, 'paperSprite');

    this.enemy.play("walkPaper", true);

    this.enemy2 = new ExampleEnemy(this, this.scale.width / 3, this.scale.height / 3, 'examSprite');

    this.enemy2.play("walkExam", true);

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

    //create powerups

    this.powerups = this.physics.add.group()
    this.spawnPowerup();

    this.physics.add.collider(this.player, this.powerups, (player, powerup) => {
      const newPowerup = { name: powerup.texture.key, effect: powerup.effect };
      player.applyBoost(newPowerup);
      powerup.destroy();
    });

    this.time.addEvent({
      delay: Phaser.Math.Between(30000, 40000),
      callback: this.spawnPowerup,
      callbackScope: this,
      loop: true,
    });

    this.timerText = this.add.text(screenWidth / 2, 16, `Time: 0:00`, { fontSize: '24px', fill: '#000000' })
    this.timerText.setOrigin(0.5);
    this.timerText.setScrollFactor(0);
    this.timerText.setDepth(10);

    this.timeElapsed = 0;
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })

    //set new gamestate
    this.data.set('checkpoint', 0);
    this.data.set('level', 0);
    this.data.set('score', 0);
    this.data.set('health', 100);
    this.data.set('weapons', ["0"]);
    this.data.set('powerups', []);
  }

  spawnPowerup() {
    let randomX = Phaser.Math.Between(0, this.map.widthInPixels - 10);
    let randomY = Phaser.Math.Between(0, this.map.heightInPixels - 10);
    let powerup = this.powerups.create(randomX, randomY, 'sodaSprite');

    powerup.effect = 'speedBoost';
    powerup.setScale(0.5);
  }

  /*spawnWeapon() {
    let randomX = Phaser.Math.Between(0, this.map.widthInPixels - 10);
    let randomY = Phaser.Math.Between(0, this.map.heightInPixels - 10);
    //let weapon = this.physics.add.sprite(randomX, randomY, 'pencilSprite');
    // Spawn weapon
    const weapons = this.physics.add.group();

    // Equip weapon
    this.physics.add.overlap(player, weapons, (player, weapon) => {
      const newWeapon = { name: weapon.texture.key, damage: weapon.damage };
      player.handleWeaponPickup(newWeapon);
      weapon.destroy();
    });
  }
*/

  updateTimer() {
    this.timeElapsed++;

    let minutes = Math.floor(this.timeElapsed / 60);
    let seconds = this.timeElapsed % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    this.timerText.setText(`Time: ${minutes}:${seconds}`);

    if (this.timeElapsed === 10) {
      this.data.set('checkpoint', 1);
    }
  }
  update(time, delta) {
    // Update player
    this.player.update(this.input.keyboard.createCursorKeys(), this.pointer);

    // Update enemy
    this.enemy.update(this.player.getPosition());

    this.enemy2.update(this.player.getPosition());

  }

  


}
