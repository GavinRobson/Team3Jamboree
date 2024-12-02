export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, inventory, health) {
    super(scene, x, y, texture);

    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);

    this.speed = 200;
    this.deadZone = 50;

    this.rotationSpeed = 0.1;

    this.setScale(0.50);
    this.health = health
    this.inventory = inventory;

 }
  update(cursors, pointer) {

    const distanceToCursor = Phaser.Math.Distance.Between(this.x, this.y, pointer.worldX, pointer.worldY);

    if (distanceToCursor > this.deadZone) {

      this.scene.physics.moveTo(this, pointer.worldX, pointer.worldY, this.speed);

      this.setFlipX(pointer.worldX < this.x);
    //  this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, angleToCursor, this.rotationSpeed);
    } else {
      this.body.setVelocity(0, 0);
    }
  }


  getAngle() {
    return Phaser.Math.RadToDeg(this.rotation);
  }

  getPosition() {
    return { x: this.x, y: this.y }
  }

  attack(pointer) {
  }

  // Powerups
  applyBoost(boost, effect) {
    if (effect === "speed") {
      this.speed += boost;
    }
    this.activePowerUps.push({ boost, effect });
    console.log(`Power-up applied: ${effect}, Boost: ${boost}, Current speed: ${this.speed}`);
  }

  removeBoost(boost, effect) {
    if (effect === "speed") {
      this.speed -= boost;
    }
    console.log(`Power-up removed: ${effect}, Boost: ${boost}, Current speed: ${this.speed}`);
    this.activePowerUps = this.activePowerUps.filter(p => p.effect !== effect || p.boost !== boost);
  }

  // Weapon 
  equipWeapon(weaponName) {
    console.log(`Equipped ${weaponName}`);
    return { name: weaponName, damage: 1 };
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