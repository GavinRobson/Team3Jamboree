import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export default class PauseMenu extends Phaser.Scene {
  constructor() {
    super('PauseMenu')
  }
  init(data) {
    this.userId = data.userId;
    console.log('User ID in PauseMenu:', this.userId)
  }
  create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    this.add.rectangle(screenWidth / 2, screenHeight / 2, 400, 300, 0x000000, 0.5);
    

    const resumeButton = this.add.text(screenWidth / 2, 350, 'Resume', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    const restartButton = this.add.text(screenWidth / 2, 450, 'Restart', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    const saveAndQuitButton = this.add.text(screenWidth / 2, 550, 'Save and Quit', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    this.input.keyboard.on('keydown-P', () => {
      this.scene.stop();
      this.scene.resume('GameScene');
    })

    resumeButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.resume('GameScene');
    });
  
    restartButton.on('pointerdown', () => {
      this.scene.stop('GameScene');
      this.scene.start('GameScene');
      this.scene.stop();
    });

    saveAndQuitButton.on('pointerdown', () => {
        const checkpoint = this.scene.get('GameScene').data.get('checkpoint');
        const level = this.scene.get('GameScene').data.get('level');
        const health = this.scene.get('GameScene').data.get('health');
        const weapons = this.scene.get('GameScene').data.get('weapons');
        const powerups = this.scene.get('GameScene').data.get('powerups');
        console.log(checkpoint, level, health, weapons, powerups)
    })
  }
}