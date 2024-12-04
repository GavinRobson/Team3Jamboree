import { getEnemyMessage } from "@/data/getEnemyMessage";

export default class ChatMenu extends Phaser.Scene {
  constructor() {
    super('ChatMenu');
  }

  async create() {
    const screenWidth = this.cameras.main.width
    const screenHeight = this.cameras.main.height
    this.add.rectangle(300, screenHeight, 400, 300, 0x000000, 0.5);
    const loadingText = this.add.text(300, 280, '', { font: '20px Arial', fill: '#ffffff' });

    const health = this.scene.get("GameScene").data.get('health');

    const data = await getEnemyMessage(health);

    loadingText.setText(`${data.content}`)
  }
}