class PowerUp {
    constructor(name, boost, duration, effect) {
        this.name = name;
        this.boost = boost; 
        this.duration = duration; 
        this.effect = effect; 
        this.active = false;
    }

    activate(player) {
        if (!this.active) {
            this.active = true;
            console.log(`${this.name} activated! Boost: ${this.boost}, Duration: ${this.duration}s, Effect: ${this.effect}`);
            player.applyBoost(this.boost, this.effect);
            setTimeout(() => {
                this.deactivate(player);
            }, this.duration * 1000);
        }
    }

    deactivate(player) {
        console.log(`${this.name} effect ended.`);
        this.active = false;
        player.removeBoost(this.boost, this.effect);
    }
}
