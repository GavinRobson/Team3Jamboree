export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);

    this.speed = 200;
    this.deadZone = 50;

    this.rotationSpeed = 0.1;

    this.setScale(0.50);
 }
  update(cursors, pointer) {
    const distanceToCursor = Phaser.Math.Distance.Between(this.x, this.y, pointer.worldX, pointer.worldY);

    if (distanceToCursor > this.deadZone) {
      const angleToCursor = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
      this.scene.physics.moveTo(this, pointer.worldX, pointer.worldY, this.speed);

      this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, angleToCursor, this.rotationSpeed);
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
}