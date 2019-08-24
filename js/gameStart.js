const gameStart = {
  key: 'gameStart',
  preload() {
    // background
    this.load.image('bg', 'assets/bg/bg0.png');
    // btnStart
    this.load.image('btnStart', 'assets/button/button_play.png');
    // hint
    this.load.image('btnHint', 'assets/button/button_hint.png');
    this.load.image('btnClose', 'assets/button/button_close.png');
    this.load.image('hint', 'assets/ui/hint.png');
  },
  create() {
    // background
    this.bg = this.add.image(cw / 2, ch / 2, 'bg');
    // btnStart
    this.btnStart = this.add.image(845.5, 619.5, 'btnStart');
    this.btnStart.setInteractive();
    this.btnStart.on('pointerup', () => {
      this.scene.start('gamePlay');
    });
    // btnHint
    this.btnHint = this.add.image(928.5, 619.5, 'btnHint').setInteractive();
    this.btnHint.on('pointerup', () => {
      this.hintContainer.visible = true;
    });
    // hintContainer
    this.btnClose = this.add.image(1265.86, 96.86, 'btnClose').setInteractive();
    this.btnClose.on('pointerup', () => {
      this.hintContainer.visible = false;
    });
    this.hint = this.add.image(873, 384.5, 'hint');
    this.hintContainer = this.add.container(0, 0, [this.hint, this.btnClose]);
    this.hintContainer.visible = false;
  },
  upload() {},
};
