var Menu = {

    preload : function() {
		gen.preloadClouds(this);
        this.load.image('menu', './assets/title.png');
		game.load.audio('blue_world',['./assets/Blue-World.ogg']);
    },

    create: function () {
		
		// the background images
		this.add.sprite(0, 0, 'bg_sky');
		gen.createClouds(this);
		this.add.sprite(0, 0, 'riverbank');
		
        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'menu', this.startGame, this);

		if (music==null) music = game.add.audio('blue_world');
		
    },
	
	update: function() {
		gen.updateClouds();
		if (!music.isPlaying) music.play();
	},

    startGame: function () {
		
        // Change the state to the actual game.
        game.state.start('Prehanoi');

    }

};