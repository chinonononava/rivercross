var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/gameover.png');
    },

    create : function() {
		this.add.sprite(0, 0, 'bg_sky');
		gen.createClouds(this);
		this.add.sprite(0, 0, 'riverbank');
		
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        gameovertext_a = game.add.text(game.world.centerX, game.world.centerY + 40, "Your moves: " + moves.toString(), { font: "bold 30px sans-serif", fill: "#000", align: "center"});
		
		if (moves==Math.pow(2,discCount)-1) {
			gameovertext_b = game.add.text(game.world.centerX, game.world.centerY + 90, "GOOD JOB, you used the least moves possible!", { font: "bold 16px sans-serif", fill: "#000", align: "center"});
			gameovertext_b.anchor.x = Math.round(gameovertext_b.width * 0.5) / gameovertext_b.width;
		}
		gameovertext_a.anchor.x = Math.round(gameovertext_a.width * 0.5) / gameovertext_a.width;
		

    },
	
	update: function() {
		gen.updateClouds();
		if (!music.isPlaying) music.play();
	},

    startGame: function () {

        // Change the state back to Game.
        game.state.start('Menu');

    }

};