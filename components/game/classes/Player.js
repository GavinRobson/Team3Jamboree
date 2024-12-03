export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, currentWeapon, health, enemies, score) {
    super(scene, x, y, texture);

    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);

    this.speed = 150;
    this.deadZone = 50;

    this.rotationSpeed = 0.1;
    this.setScale(0.50);
    this.health = health
    this.weapons = [
      {
        id: 0,
        name: 'Pencil',
        sprite: 'pencilSprite',
        damage: 2,
        fireRate: 250
      },
      {
        id: 1,
        name: 'Pen',
        sprite: 'penSprite',
        damage: 4,
        fireRate: 125
      },
      {
        id: 2,
        name: 'ChatGPTinator',
        sprite: 'chatGPTinator.png',
        damage: 10,
        fireRate: 0,
      }
    ]

    if (currentWeapon !== null) {
      this.currentWeapon = this.weapons[currentWeapon];
    } else {
      this.currentWeapon = 'DefaultWeapon'
    }
    this.autoAttackTimer = 0;

    this.activePowerUps = [];
    this.enemies = enemies;
    this.score = score;
 }
 
  preload() {
    this.load.spritesheet('pencilSprite', '/Sprites/pencil.png', {
      frameWidth: 62,
      frameHeight: 48
    })
    this.load.spritesheet('penSprite', '/Sprites/pen.png' , {
      frameWidth: 48,
      frameHeight: 48
    })
  }

  update(cursors, pointer, enemies) {
    if (this.health <= 0) {
      return { status: 'dead' }
    }
    this.enemies = enemies
    const distanceToCursor = Phaser.Math.Distance.Between(this.x, this.y, pointer.worldX, pointer.worldY);

    this.attack(pointer);

    if (distanceToCursor > this.deadZone) {

      this.scene.physics.moveTo(this, pointer.worldX, pointer.worldY, this.speed);

      this.setFlipX(pointer.worldX < this.x);
    //  this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, angleToCursor, this.rotationSpeed);
    } else {
      this.body.setVelocity(0, 0);
    }
    return { status: 'ok' }
  }


  getAngle() {
    return Phaser.Math.RadToDeg(this.rotation);
  }

  getHealth() {
    return this.health
  }

  getScore() {
    return this.score;
  }

  heal(health) {
    this.health += health;
    if (this.health > 100) {
      this.health = 100;
    }
  }

  getPosition() {
    return { x: this.x, y: this.y }
  }

  attack(pointer) {
    if (!this.currentWeapon) {
      return;
    }

    if (this.autoAttackTimer > 0) {
      if (this.autoAttackTimer >= this.currentWeapon.fireRate) {
        this.autoAttackTimer = 0;
        return;
      }
      const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
      const offsetX = Math.cos(angle) * 20;
      const offsetY = Math.sin(angle) * 20;
      this.attackingWeapon.setPosition(this.x + offsetX, this.y + offsetY)
      this.attackingWeapon.setRotation(angle + 3.14/2);
      this.autoAttackTimer++;
      return;
    }
    
    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
    const offsetX = Math.cos(angle) * 20;
    const offsetY = Math.sin(angle) * 20;
    this.attackingWeapon = this.scene.physics.add.sprite(this.x + offsetX, this.y + offsetY, this.currentWeapon.sprite);
    this.attackingWeapon.setOrigin(0.5, 1)
    this.attackingWeapon.setRotation(angle + 3.14/2);
    this.scene.time.delayedCall(500, () => {
      this.attackingWeapon.destroy();
    })
    this.scene.physics.add.overlap(this.attackingWeapon, this.enemies, this.handleWeaponEnemyCollision, null, this);
    this.autoAttackTimer++;
  }

  handleWeaponEnemyCollision(weapon, enemy) {
    const enemyHealth = enemy.takeDamage(this.currentWeapon.damage);
    if (enemyHealth <= 0) {
      this.score += enemy.getScore();
    }
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  // Powerups
  applyBoost(speed) {
    this.speed += speed;
    setTimeout(() => {
      this.speed -= speed
    }, 1500)
  }

  removeBoost(boost, effect) {
    if (effect === "speed") {
      this.speed -= boost;
    }
    console.log(`Power-up removed: ${effect}, Boost: ${boost}, Current speed: ${this.speed}`);
    this.activePowerUps = this.activePowerUps.filter(p => p.effect !== effect || p.boost !== boost);
  }

  // Weapon 
  equipWeapon(weaponId) {
    this.currentWeapon = this.weapons[weaponId];
  }

  getCurrentWeapon() {
    return this.currentWeapon;
  }

  replaceWeapon(newWeapon) {
    console.log(`Replaced ${this.currentWeapon.name} with ${newWeapon.name}`);
    this.currentWeapon = newWeapon;
  }

  weaponPickup(newWeapon) {
    if (newWeapon.damage > this.currentWeapon.damage) {
      this.replaceWeapon(newWeapon);
    } else {
      console.log(`Kept current weapon: ${this.currentWeapon.name}`);
    }
  }
}