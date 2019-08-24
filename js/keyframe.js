const keyFrame = (self) => {
  self.anims.create({
    key: 'stable',
    frames: self.anims.generateFrameNumbers('turtle', { start: 0, end: 1 }),
    frameRate: 5,
    repeat: -1,
  });
  self.anims.create({
    key: 'move',
    frames: self.anims.generateFrameNumbers('turtle', { start: 2, end: 3 }),
    frameRate: 5,
    repeat: -1,
  });
  self.anims.create({
    key: 'hurt',
    frames: self.anims.generateFrameNumbers('turtle', { start: 4, end: 4 }),
    frameRate: 5,
    repeat: 0,
  });
  self.anims.create({
    key: 'dead',
    frames: self.anims.generateFrameNumbers('turtle', { start: 5, end: 5 }),
    frameRate: 5,
    repeat: 0,
  });
  self.anims.create({
    key: 'eat',
    frames: self.anims.generateFrameNumbers('turtle', { start: 6, end: 7 }),
    frameRate: 5,
    repeat: 0,
  });
};
