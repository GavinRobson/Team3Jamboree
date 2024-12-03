class Soda extends PowerUp {
    constructor() {
        super("Soda", 200, 8, "Quick speed boost with short duration.");
        this.sprite = null;
    }

    createSprite(scene, x, y) {
        this.sprite = scene.add.sprite(x, y, "soda");
        this.sprite.setScale(0.5);
    }

    activate(player) {
        console.log(`${this.name} activated! Duration: ${this.duration} seconds`);

        // Apply the speed boost by modifying the player's velocity
        player.setVelocity(player.body.velocity.x * 2, player.body.velocity.y);  // Double the horizontal velocity for boost

        // Hide the soda sprite
        if (this.sprite) {
            this.sprite.setVisible(false);
        }

        // Reset velocity after the duration
        setTimeout(() => {
            player.setVelocity(player.body.velocity.x / 2, player.body.velocity.y);  // Reset velocity
            console.log(`${this.name} effect ended.`);
        }, this.duration * 1000);  // Convert seconds to milliseconds
    }
}
