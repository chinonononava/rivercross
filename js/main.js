var game, music = null;

game = new Phaser.Game(600, 450, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Prehanoi', Prehanoi);
game.state.add('Hanoi', Hanoi);
game.state.add('Game_Over', Game_Over);


game.state.start('Menu');

//Music by Eric Matyas

//www.soundimage.org