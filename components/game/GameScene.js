import * as Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.cursorPosition = { x: 0, y: 0 }; // Initialize cursor position
    this.deadZoneRadius = 30; // Define dead zone radius
  }

  preload() {
    this.load.image("map", "map.jpg"); // Update with actual path
  }

  create() {
    // Create the map (background)
    this.map = this.add.image(0, 0, "map");
    this.map.setOrigin(0.5, 0.5);
    this.map.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Create the player sprite at the center
    this.player = this.add.graphics();
    const playerSize = 20;

    
    // Draw the player box
    this.player.fillStyle(0x00ff00, 1); // Green color, fully opaque
    this.player.fillRect(-playerSize / 2, -playerSize / 2, playerSize, playerSize);

    // Position the player in the center of the screen
    this.player.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    // Set up cursor movement tracking
    this.input.on("pointermove", (pointer) => {
      this.cursorPosition.x = pointer.x;
      this.cursorPosition.y = pointer.y;
    });
  }

  update(time, delta) {
    // Calculate distance between player and cursor
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.cursorPosition.x, this.cursorPosition.y);

    // Move player toward the cursor only if it's outside the dead zone
    if (distance > this.deadZoneRadius) {
      // Calculate angle towards cursor
      const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.cursorPosition.x, this.cursorPosition.y);

      // Move map in the opposite direction to simulate player moving toward the cursor
      const speed = 200; // Adjust speed as needed
      const moveX = Math.cos(angle) * speed * (delta / 1000);
      const moveY = Math.sin(angle) * speed * (delta / 1000);

      // Adjust map position to create movement effect
      this.map.x -= moveX;
      this.map.y -= moveY;
    }
  }
}
