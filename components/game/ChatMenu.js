import { getEnemyMessage } from "@/data/getEnemyMessage";

export default class ChatMenu extends Phaser.Scene {
  constructor() {
    super('ChatMenu');
    this.textBox = null;
    this.text = null;
    this.health = null;
    this.updateInterval = 30000; 
  }

  async create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    this.textBox = this.add.rectangle(
      screenWidth / 2,
      screenHeight - 150,
      400,
      100,
      0x000000,
      0.5
    );

    this.text = this.add.text(
      this.textBox.x - this.textBox.width / 2 + 10,
      this.textBox.y - this.textBox.height / 2 + 10,
      '',
      {
        font: '16px Arial',
        fill: '#ffffff',
        wordWrap: { width: this.textBox.width - 20 },
      }
    );

    this.health = this.scene.get("GameScene").data.get('health');

    await this.updateText();

    this.time.addEvent({
      delay: this.updateInterval,
      callback: this.updateText,
      callbackScope: this,
      loop: true
    });
  }

  async updateText() {
    const data = await getEnemyMessage(this.health);

    this.text.setAlpha(1);
    this.textBox.setAlpha(1);

    this.text.setText(`${data.content}`);

    this.time.delayedCall(10000, () => {
      this.tweens.add({
        targets: [this.textBox, this.text], 
        alpha: 0, 
        duration: 1000, 
        onComplete: () => {
          this.text.setText('');
        }
      });
    });
  }
}