class Soda extends PowerUp {
    constructor() {
        super("Soda", 10, 8, "Quick speed boost with short duration.");
        this.sprite = null;
    }

    createSprite(scene, x, y) {
        this.sprite = scene.add.sprite(x, y, "soda");
        this.sprite.setScale(0.5);
    }

    activate() {
        console.log(`${this.name} activated! Duration: ${this.duration} seconds`);
        if (this.sprite) {
            this.sprite.setVisible(false);
        }
    }
}