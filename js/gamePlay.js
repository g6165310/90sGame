const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const createTrash = () => {};
const trash = [
  {
    name: 'can',
    w: 41,
    h: 43,
    speed: 4,
  },
  {
    name: 'bottle',
    w: 76,
    h: 50,
    speed: 3.5,
  },
  {
    name: 'bag',
    w: 91,
    h: 91,
    speed: 3,
  },
  {
    name: 'net',
    w: 135,
    h: 165,
    speed: 2,
  },
];

const gamePlay = {
  key: 'gamePlay',
  preload() {
    // data
    this.level = 1;
    this.life = 3;
    this.time = 90;
    this.is_end = true;
    this.is_pause = true;
    this.is_hitting = true;
    this.trashArr = [];
    this.jellyfishArr = [];
    // music
    this.load.audio('bg_music', '../assets/Sea_Ritual.mp3');

    // background
    this.load.image('bg1', '../assets/bg/bg1.png');
    this.load.image('bg2', '../assets/bg/bg2.png');
    this.load.image('bg3', '../assets/bg/bg3.png');
    this.load.image('rock1', '../assets/bg/map1_rock.png');
    this.load.image('rock2', '../assets/bg/map2_rock.png');
    this.load.image('rock3', '../assets/bg/map3_rock.png');
    // UI
    this.load.image('lifeUI', '../assets/ui/turtlelife.png');
    this.load.image('cross', '../assets/button/button_close.png');
    this.load.image('timeUI', '../assets/ui/timebubble.png');
    this.load.image('btnHint', '../assets/button/button_hint2.png');
    this.load.image('hint', '../assets/ui/hint.png');
    // turtle
    this.load.spritesheet('turtle', '../assets/sprite/turtlemove.png', {
      frameWidth: 400,
      frameHeight: 400,
    });
    // trash
    this.load.image('can', '../assets/sprite/trash1.png');
    this.load.image('bottle', '../assets/sprite/trash2.png');
    this.load.image('bag', '../assets/sprite/trash3.png');
    this.load.image('net', '../assets/sprite/trash4.png');
    // jellyfish
    this.load.image('jellyfish', '../assets/sprite/jellyfish.png');
    // gameover
    this.load.image('game_fail', '../assets/ui/gameover_1.png');
    this.load.image('game_success', '../assets/ui/gameover_2.png');
    this.load.image('btnRestart', './assets/button/button_playagain.png');
  },
  create() {
    this.bg_music = this.sound.add('bg_music');
    this.bg_music.play();
    keyFrame(this);
    this.physics.world.setBounds(0, 103, cw, 450);
    // background
    this.bg3 = this.add.image(0, 0, 'bg3').setOrigin(0);
    this.bg2 = this.add.image(0, 0, 'bg2').setOrigin(0);
    this.bg1 = this.add.image(0, 0, 'bg1').setOrigin(0);
    this.rock3 = this.add
      .tileSprite(0, ch, cw, 167, 'rock3')
      .setOrigin(0, 1)
      .setAlpha(0);
    this.rock2 = this.add
      .tileSprite(0, ch, cw, 233, 'rock2')
      .setOrigin(0, 1)
      .setAlpha(0);
    this.rock1 = this.add.tileSprite(0, ch, cw, 215, 'rock1').setOrigin(0, 1);

    // background change animation
    this.timeLine = this.tweens.createTimeline();
    this.timeLine.add({
      targets: [this.bg1, this.rock1],
      alpha: 0,
      ease: 'Power0',
      duration: 2000,
      offset: 30000,
    });
    this.timeLine.add({
      targets: this.rock2,
      alpha: 1,
      offset: 30000,
      ease: 'Power0',
      duration: 2000,
    });
    this.timeLine.add({
      targets: [this.bg2, this.rock2],
      alpha: 0,
      ease: 'Power0',
      duration: 2000,
      offset: 60000,
    });
    this.timeLine.add({
      targets: this.rock3,
      alpha: 1,
      offset: 60000,
      ease: 'Power0',
      duration: 2000,
    });
    this.timeLine.play();
    // Life
    this.add.image(50, 43.86, 'lifeUI').setOrigin(0);
    this.add.image(144, 64.5, 'cross').setOrigin(0);
    this.lifeTxt = this.add.text(185, 56, this.life, {
      color: '#707070',
      fontFamily: 'Roboto',
      fontStyle: 'bold',
      fontSize: '40px',
    });
    // Time
    this.add.image(1231, 33, 'timeUI').setOrigin(0);
    this.timeTxt = this.add.text(1250, 54, this.time, {
      color: '#ffffff',
      fontFamily: 'Roboto',
      fontStyle: 'bold',
      fontSize: '40px',
    });

    this.timer = setInterval(() => {
      if (this.is_pause) return;
      this.time--;
      if (this.time < 60 && this.time >= 30) {
        this.level = 2;
      } else if (this.time < 30) {
        this.level = 3;
      }

      this.timeTxt.setText(this.time);
      if (this.time < 10) {
        this.timeTxt.setText(`0${this.time}`);
      }
      if (this.time === 0) {
        this.is_end = true;
        clearInterval(this.timer);
        this.add.image(cw / 2, ch / 2, 'game_success');
        this.btnRestart = this.add.image(cw / 2, ch / 2 + 100, 'btnRestart');
        this.btnRestart.setInteractive();
        this.btnRestart.on('pointerdown', () => this.scene.start('gameStart'));
      }
    }, 1000);
    // btnHint
    this.btnHint = this.add
      .image(1166, 49, 'btnHint')
      .setOrigin(0)
      .setInteractive();
    this.btnHint.on('pointerup', () => {
      this.hintContainer.visible = true;
      this.is_pause = true;
      this.timeLine.pause();
    });
    // hintContainer
    this.btnClose = this.add
      .image(816.5, 30.5, 'cross')
      .setOrigin(0)
      .setInteractive();
    this.btnClose.on('pointerup', () => {
      this.hintContainer.visible = false;
      this.is_pause = false;
      this.bg_music.resume();
      this.timeLine.resume();
    });
    this.hint = this.add.image(0, 0, 'hint').setOrigin(0);
    this.hintContainer = this.add.container(437, 54, [this.hint, this.btnClose]);
    this.hintContainer.depth = 10;
    this.hintContainer.visible = false;
    // turtle
    this.turtle = this.physics.add.sprite(cw / 8, ch / 2, 'turtle');
    this.turtle.setCollideWorldBounds(true);
    this.turtle.setSize(245, 130);

    // collide
    this.hit = (turtle, trash) => {
      this.is_hitting = true;
      this.life--;
      this.lifeTxt.setText(this.life);
      turtle.anims.play('hurt', true);
      trash.destroy();
      setTimeout(() => {
        this.is_hitting = false;
      }, 500);
      if (this.life === 0) {
        this.is_end = true;
        turtle.anims.play('dead', true);
        clearInterval(this.timer);
        this.add.image(cw / 2, ch / 2, 'game_fail');
        this.btnRestart = this.add.image(cw / 2, ch / 2 + 100, 'btnRestart');
        this.btnRestart.setInteractive();
        this.btnRestart.on('pointerdown', () => this.scene.start('gameStart'));
      }
    };
    // getLife from jellyfish
    this.getLife = (turtle, jellyfish) => {
      this.is_hitting = true;
      turtle.anims.play('eat', true);
      jellyfish.destroy();
      setTimeout(() => {
        this.is_hitting = false;
      }, 500);
      if (this.life < 5) {
        this.life++;
        this.lifeTxt.setText(this.life);
      }
    };

    this.is_end = false;
    this.is_pause = false;
    this.is_hitting = false;
  },
  update() {
    if (this.is_pause || this.is_end) {
      this.bg_music.pause();
      this.turtle.setVelocity(0);
      this.turtle.anims.stop();
      return;
    }
    this.rock1.tilePositionX += 2;
    this.rock2.tilePositionX += 2;
    this.rock3.tilePositionX += 2;

    // trash
    if (
      this.trashArr.length === 0 ||
      this.trashArr[this.trashArr.length - 1].x < cw * 0.3 * this.level
    ) {
      const trashIdx = getRandom(0, 3);
      this[`trash${this.trashArr.length}`] = this.physics.add.sprite(
        cw + 200,
        getRandom(103, 553 - trash[trashIdx].h),
        trash[trashIdx].name,
      );
      this[`trash${this.trashArr.length}`].setSize(trash[trashIdx].w, trash[trashIdx].h);
      this[`trash${this.trashArr.length}`].body.moves = false;
      this[`trash${this.trashArr.length}`].baseSpeed = trash[trashIdx].speed;
      this.trashArr.push(this[`trash${this.trashArr.length}`]);
      this.physics.add.collider(this.turtle, this[`trash${this.trashArr.length - 1}`], this.hit);
    }
    this.trashArr.forEach((obj) => {
      obj.x -= obj.baseSpeed * 1.5;
    });
    // jellyfish
    if (
      this.time < 30 &&
      (this.jellyfishArr.length === 0 ||
        (this.time % 5 === 0 && this.jellyfishArr[this.jellyfishArr.length - 1].x < cw / 3))
    ) {
      this[`jellyfish${this.jellyfishArr.length}`] = this.physics.add.sprite(
        cw + 200,
        getRandom(103, 553 - 72),
        'jellyfish',
      );
      this[`jellyfish${this.jellyfishArr.length}`].body.moves = false;
      this[`jellyfish${this.jellyfishArr.length}`].setRotation(-1.57079633);
      this.jellyfishArr.push(this[`jellyfish${this.jellyfishArr.length}`]);

      this.physics.add.collider(
        this.turtle,
        this[`jellyfish${this.jellyfishArr.length - 1}`],
        this.getLife,
      );
    }
    if (this.jellyfishArr.length > 0) {
      this.jellyfishArr.forEach((obj) => {
        obj.x -= 7;
      });
    }

    // keyboard turtle move
    const keyboard = this.input.keyboard.createCursorKeys();
    if (this.is_hitting) {
      this.turtle.setVelocity(0);
    } else if (keyboard.up.isDown) {
      this.turtle.setVelocityY(-500);
      this.turtle.anims.play('move', true);
    } else if (keyboard.right.isDown) {
      console.log(123);
      this.turtle.setFlipX(0);
      this.turtle.setVelocityX(500);
      this.turtle.anims.play('move', true);
    } else if (keyboard.left.isDown) {
      this.turtle.setFlipX(1);

      this.turtle.setVelocityX(-500);
      this.turtle.anims.play('move', true);
    } else if (keyboard.down.isDown) {
      this.turtle.setVelocityY(500);
      this.turtle.anims.play('move', true);
    } else if (!this.is_hitting) {
      this.turtle.anims.play('stable', true);
      this.turtle.setVelocity(0);
    }
  },
};
