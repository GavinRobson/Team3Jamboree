class Weapons {
    constructor(name, damage, range, fireRate) {
        this.name = name;
        this.damage = damage;
        this.range = range;
        this.fireRate = fireRate;
    }

    attack(distance) {
        if (distance <= this.range) {
            console.log('${this.name} hit the target for ${this.damage} damage');
        } else {
            console.log('${this.name} is out of range');
        }
    }
    
}