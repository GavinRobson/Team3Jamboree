import * as Phaser from "phaser";
import Player from '@/components/game/classes/Player';
import ExampleEnemy from '@/components/game/classes/ExampleEnemy';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  init(data) {
    this.userId = data.userId;
    if (data.checkpoint !== null) {
      this.checkpoint = parseInt(data.checkpoint);
    } else {
      this.checkpoint = 0;
    }
    if (data.score !== null) {
      this.score = parseInt(data.score);
    } else {
      this.score = 0;
    }
    if (data.health !== null) {
      this.health = parseInt(data.health)
    } else {
      this.health = 100;
    }
    this.currentWeapon = data.currentWeapon;
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

    this.load.spritesheet("quizSprite", "Sprites/QuizSprite.png", {
      frameWidth: 48,
      frameHeight: 48,

    });

    

    this.load.spritesheet('sodaSprite', 'Sprites/Soda.png', { 
      frameWidth: 225, 
      frameHeight: 225 
    });

    this.load.spritesheet('pencilSprite', 'Sprites/pencil.png', {
      frameWidth: 62, 
      frameHeight: 48,
    })

    this.load.spritesheet('penSprite', 'Sprites/pen.png', {
      frameWidth: 48,
      frameHeight: 48,
    })
    
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
    this.grasslayer = this.map.createLayer("Grass", tileset, horizontalOffset, 0);
    this.roadlayer = this.map.createLayer("Roads", tileset, horizontalOffset, 0);
    this.schoollayer = this.map.createLayer("School background", tileset, horizontalOffset, 0);
    this.signallayer = this.map.createLayer("Signals", tileset, horizontalOffset, 0);
    this.trees1layer = this.map.createLayer("TreesLayer1", tileset, horizontalOffset, 0);
    this.trees2layer = this.map.createLayer("TreesLayer2", tileset, horizontalOffset, 0);
    this.trees3layer = this.map.createLayer("TreesLayer3", tileset, horizontalOffset, 0);
    this.windowandoorlayer = this.map.createLayer("Windows and Doors", tileset, horizontalOffset, 0);

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

    //create enemies group
    this.enemies = this.physics.add.group();
    
    // Create player
    
    this.invincible = false;
    this.invincibleTime = 1000;
    this.player = new Player(this, this.scale.width / 2, this.scale.height / 2, 'playerSprite', this.currentWeapon, this.health, this.enemies, this.score);
    this.player.setScale(1); // makes the player bigger.
    this.player.play("walk", true);
    /*
    this.player = this.add.Sprite(10, 10, "playerSprite");
    */
   
   this.physics.add.collider(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this)
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

    this.anims.create({
      key: "walkQuiz",
      frames: this.anims.generateFrameNumbers("quizSprite", {frames:[0, 1, 2]}), 
      frameRate:8,
      repeat:-1,
    })


    this.cameras.main.startFollow(this.player);
    
    this.input.mouse.disableContextMenu();
    this.pointer = this.input.activePointer;
    
    //colliders for player
    this.physics.add.collider(this.player, this.trees1layer);
    this.trees1layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.player, this.trees2layer);
    this.trees2layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.player, this.trees3layer);
    this.trees3layer.setCollisionBetween(232, 373);
    this.physics.add.collider(this.player, this.schoollayer);
    this.schoollayer.setCollisionBetween(124, 211);
    this.physics.add.collider(this.player, this.signallayer);
    this.signallayer.setCollisionBetween(168, 411);

    this.weapons = this.physics.add.group();
    let pencil;
    if (this.currentWeapon === null) {

      pencil = this.weapons.create(screenWidth / 2, 150, 'pencilSprite');
      pencil.setData('weaponId', 0);
      pencil.setScale(1)
      
      this.tweens.add({
        targets: pencil,
        y: pencil.y - 20,
        ease: 'Sine.easeInOut',
        duration: 1000,
        yoyo: true,
        repeat: -1
      })
    }

    this.physics.add.overlap(this.player, this.weapons, (player, weapon) => {
      const weaponType = weapon.getData('weaponId');
      this.player.equipWeapon(weaponType);
      console.log('Equipped:', weaponType)
      weapon.destroy();
    })

    //create powerups

    this.powerups = this.physics.add.group()
    this.spawnPowerup();

    this.physics.add.collider(this.player, this.powerups, (player, powerup) => {
      const newPowerup = { name: powerup.texture.key, effect: powerup.effect };
      player.applyBoost(100);
      player.heal(10)
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

    this.healthText = this.add.text(screenWidth / 2, this.cameras.main.height - 16, 'Health: 100', { fontSize: '24px', fill: '#000000' })
    this.healthText.setOrigin(0.5);
    this.healthText.setScrollFactor(0);
    this.healthText.setDepth(10);

    this.timeElapsed = this.checkpoint * 10;
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })

    //set new gamestate
    this.data.set('checkpoint', this.checkpoint);
    this.data.set('score', this.score);
    this.data.set('health', this.health);
    this.data.set('currentWeapon', this.currentWeapon);

    this.invincibilityTimer = this.time.addEvent({
      delay: this.invincibleTime,
      callback: this.resetInvincibility,
      callbackScope: this,
      loop: false
    })

    this.scene.launch('ChatMenu')
  }

  spawnPowerup() {
    let randomX = Phaser.Math.Between(this.cameras.main.width / 2 - 700, this.cameras.main.width / 2 + 700);
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

    this.enemySpawner();
    let minutes = Math.floor(this.timeElapsed / 60);
    let seconds = this.timeElapsed % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    this.timerText.setText(`Time: ${minutes}:${seconds}`);

    if (this.timeElapsed % 10 === 0) {
      this.data.set('checkpoint', this.data.get('checkpoint') + 1)
      this.data.set('score', this.score);
      this.data.set('health', this.health)
      this.data.set('currentWeapon', this.player.getCurrentWeapon());
    }

    if (this.timeElapsed === 240 && !this.spawned) {
      const pen = this.weapons.create(this.cameras.main.width / 2 + 700, this.map.heightInPixels - 75, 'penSprite');
      pen.setData('weaponId', 1);
      pen.setScale(1);

      this.tweens.add({
        targets: pen,
        x: pen.x - 20,
        ease: 'Sine.easeInOut',
        duration: 1000,
        yoyo: true,
        repeat: -1
      })
    }
  }
  update(time, delta) {
    // Update player
    const player = this.player.update(this.input.keyboard.createCursorKeys(), this.pointer, this.enemies);
    if (player.status === 'dead') {

    }
    this.health = this.player.getHealth();
    this.score = this.player.getScore();

    if (this.health <= 0) {
      this.scene.pause();
      window.location.href = `/save?userId=${this.userId}&checkpoint=0&score=${this.score}&health=100`
    }

    this.healthText.setText(`Health: ${this.health}`)
    this.topText.setText(`Score: ${this.score}`);
    this.enemies.children.iterate((enemy) => {
      enemy.update(this.player.getPosition(), time, delta)
    })
  }

  enemySpawner() {
    const chance = 25 + (Math.floor(this.timeElapsed / 60) * 15);
    if (chance >= 100) {
      const rand = Phaser.Math.Between(0, 2);
      let enemyType = rand === 0 ? {sprite: 'paperSprite', anim: 'walkPaper', damage: 5, health: 6, score: 5} : rand === 1 ? { sprite: 'examSprite', anim: 'walkExam', damage: 10, health: 12, score: 10 } : { sprite: 'quizSprite', anim: 'walkQuiz', damage: 20, health: 20, score: 20 };
      const randomX = Phaser.Math.Between((this.cameras.main.width / 2 - 800), (this.cameras.main.width / 2 + 800))
      const randomY = Phaser.Math.Between(0, this.cameras.main.height);
      const speed = 50 + ((this.timeElapsed % 60) * 25)
      const enemy = new ExampleEnemy(this, randomX, randomY, enemyType.sprite, speed, enemyType.damage, enemyType.health, enemyType.score, this.weapons);
      enemy.play(enemyType.anim, true);
      this.enemies.add(enemy)

      //colliders for enemies
      this.physics.add.collider(enemy, this.trees1layer);
      this.trees1layer.setCollisionBetween(232, 373);
      this.physics.add.collider(enemy, this.trees2layer);
      this.trees2layer.setCollisionBetween(232, 373);
      this.physics.add.collider(enemy, this.trees3layer);
      this.trees3layer.setCollisionBetween(232, 373);
      this.physics.add.collider(enemy, this.schoollayer);
      this.schoollayer.setCollisionBetween(124, 211);
      this.physics.add.collider(enemy, this.signallayer);
      this.signallayer.setCollisionBetween(168, 411);
      return;
    }

    const random = Phaser.Math.Between(0, 100);

    if (random <= chance) {
      let enemyType = null;
      if (this.timeElapsed <= 60) {
        enemyType = {sprite: 'paperSprite', anim: 'walkPaper', damage: 5, health: 6, score: 5};
      } else if (this.timeElapsed <= 120){
        enemyType = Phaser.Math.Between(0, 3) < 3 ? {sprite: 'paperSprite', anim: 'walkPaper', damage: 5, health: 6, score: 5} : { sprite: 'examSprite', anim: 'walkExam', damage: 10, health: 12, score: 10 }
      } else if (this.timeElapsed <= 180) {
        enemyType = Phaser.Math.Between(0, 1) === 0 ? {sprite: 'paperSprite', anim: 'walkPaper', damage: 5, health: 6, score: 5} : { sprite: 'examSprite', anim: 'walkExam', damage: 10, health: 12, score: 10 }
      } else if (this.timeElapsed <= 240) {
        const rand = Phaser.Math.Between(0, 4);
        enemyType = rand < 2 ? {sprite: 'paperSprite', anim: 'walkPaper', damage: 5, health: 6, score: 5} : rand < 4 ? { sprite: 'examSprite', anim: 'walkExam', damage: 10, health: 12, score: 10 } : { sprite: 'quizSprite', anim: 'walkQuiz', damage: 20, health: 20, score: 20 }
      }
      const randomX = Phaser.Math.Between((this.cameras.main.width / 2 - 800), (this.cameras.main.width / 2 + 800))
      const randomY = Phaser.Math.Between(0, this.cameras.main.height);
      const speed = 50 + ((this.timeElapsed / 60) * 25)
      const enemy = new ExampleEnemy(this, randomX, randomY, enemyType.sprite, speed, enemyType.damage, enemyType.health, enemyType.score, this.weapons );
      enemy.play(enemyType.anim, true);
      this.enemies.add(enemy)

      //colliders for enemies
      this.physics.add.collider(enemy, this.trees1layer);
      this.trees1layer.setCollisionBetween(232, 373);
      this.physics.add.collider(enemy, this.trees2layer);
      this.trees2layer.setCollisionBetween(232, 373);
      this.physics.add.collider(enemy, this.trees3layer);
      this.trees3layer.setCollisionBetween(232, 373);
      this.physics.add.collider(enemy, this.schoollayer);
      this.schoollayer.setCollisionBetween(124, 211);
      this.physics.add.collider(enemy, this.signallayer);
      this.signallayer.setCollisionBetween(168, 411);
    }
  }

  handlePlayerEnemyCollision(player, enemy) {
    if (this.invincible) return;

    const damage = enemy.getDamage();
    this.player.takeDamage(damage)

    this.invincible = true;
    this.invincibilityTimer = this.time.addEvent({
      delay: this.invincibleTime,
      callback: this.resetInvincibility,
      callbackScope: this,
      loop: false
    })
  }

  resetInvincibility() {
    console.log('reset')
    this.invincible = false;
  }
}
