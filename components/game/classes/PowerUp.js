class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, boost, duration, effect) {
        super(scene, x, y, name); // Pass texture as the `name`
        this.scene = scene;
        this.boost = boost;
        this.duration = duration;
        this.effect = effect;
        this.active = false;

        // Add to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
    }

    activate(player) {
        if (!this.active) {
            this.active = true;
            console.log(`${this.name} activated!`);
            player.applyBoost(this.boost, this.effect);
            setTimeout(() => this.deactivate(player), this.duration * 1000);
        }
    }

    deactivate(player) {
        console.log(`${this.name} effect ended.`);
        this.active = false;
        player.removeBoost(this.boost, this.effect);
        this.destroy(); // Remove from the scene
    }
}
