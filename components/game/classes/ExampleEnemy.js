export default class ExampleEnemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, speed, damage, health, score) {
      super(scene, x, y, texture);
  
      scene.add.existing(this);
  
      scene.physics.add.existing(this);
  
      this.body.setCollideWorldBounds(true);
  
      this.speed = speed
      this.damage = damage;
      this.totalHealth = health
      this.health = health;
  
      this.invincible = false;
      this.invincibleTime = 500;
      this.invincibleTimer = 0;
      this.score = score;
      
      this.healthText = scene.add.text(x, y - 20, `${(Math.round((this.totalHealth - this.health) / this.totalHealth) * 100)}%`, { fill: '#000000' })

      this.setScale(0.50);
   }
    update(playerPosition, time, delta) {
      this.scene.physics.moveTo(this, playerPosition.x, playerPosition.y, this.speed)
      this.healthText.setPosition(this.x, this.y - 20)
      if (this.invincible) {
        this.invincibleTimer += delta;
        if (this.invincibleTimer >= this.invincibleTime) {
          this.invincible = false;
          this.invincibleTimer = 0;
        }
      }
    }

    updateHealthText() {
      this.healthText.setText(`${Math.round(((this.totalHealth - this.health) / this.totalHealth) * 100)}%`, { fill: '#000000' })
    }

    getHealth() {
      return this.health;
    }

    getScore() {
      return this.score;
    }

    getDamage() {
      return this.damage;
    }

    takeDamage(damage) {
      if (this.invincible) {
        return;
      }
      this.health -= damage;
      if (this.health <= 0){
        this.scoreText = this.scene.add.text(this.x, this.y, `+${this.score}`, {fill: '#000000'})
        this.scene.time.delayedCall(1500, () => {
          this.scoreText.setText('');
          this.scoreText.setVisible(false);
        })
        this.destroy();
      }
      this.invincible = true;
      this.invincibleTimer = 0;
      this.updateHealthText();
      return this.health
    }

    destroy() {
      super.destroy();
      this.healthText.setText('');
      this.healthText.setVisible(false)
    }
  }