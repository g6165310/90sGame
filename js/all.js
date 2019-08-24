const config = {
  type: Phaser.AUTO,
  width: 1366,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  parent: 'app',
  scene: [gameStart, gamePlay],
};

const game = new Phaser.Game(config);
