export default class ExampleEnemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      scene.add.existing(this);
  
      scene.physics.add.existing(this);
  
      this.body.setCollideWorldBounds(true);
  
      this.speed = 100;
      this.deadZone = 10;
  
      this.rotationSpeed = 5;

      this.setScale(0.50);
   }
    update(playerPosition) {
      this.scene.physics.moveTo(this, playerPosition.x, playerPosition.y, this.speed)
    }
  }