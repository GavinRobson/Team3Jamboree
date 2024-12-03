class Pencil extends Weapons {
    constructor() {
        super("Pencil", 1, 2, 3);
    }

    attack(pointer) {
        this.scene.add.circle(0, 0, null, 0x000000);
    }
}