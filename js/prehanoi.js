var discCount, discCountText, prestage = 0, decButt, incButt, preh;

var Prehanoi = {
	
	preload : function() {
		
        // Load all the needed resources for the menu.
        this.load.image('prehanoi', './assets/prehanoi.png');
		this.load.image('help', './assets/help.png');
		this.load.image('controls', './assets/controls.png');
        this.load.image('arrow', './assets/arrow.png');
		
		// amount of discs
		discCount = 3;
    },

    create: function () {
		
		// the stage of the pregame
		// 0: help
		// 1: controls
		// 2: choose disc count
		prestage = 0;
		
		// bg images
		this.add.sprite(0, 0, 'bg_sky');
		gen.createClouds(this);
		this.add.sprite(0, 0, 'riverbank');
		
        // Add menu screen.
        // It will act as a button to start the game.
        preh = this.add.button(0, 0, 'help', this.startGame, this);
		decButt = this.add.button(-200, 300, 'arrow', this.decreaseDiscs, this);
        incButt = this.add.button(-200, 300, 'arrow', this.increaseDiscs, this);
		decButt.anchor.set(0.5);
		incButt.anchor.set(0.5);
		decButt.angle+=90;
		incButt.angle-=90;
		
        textStyle_Value = { font: "bold 50px arial", fill: "#ff5", align: "center"};
    },
	
	update: function() {
		gen.updateClouds();
		if (prestage == 2) discCountText.text = discCount;
		if (!music.isPlaying) music.play();
	},

    startGame: function () {
		
		if (prestage == 2) game.state.start('Hanoi');
		else if (prestage ==0) {
			prestage = 1; //controls
			preh.loadTexture('controls');
		} else if (prestage == 1) {
			textStyle_Value.alpha = 1;
			prestage = 2; //preh
			preh.loadTexture('prehanoi');
			decButt.x = 200;
			incButt.x = 400;
			discCountText = game.add.text(game.world.centerX, game.world.centerY+40, discCount.toString(), textStyle_Value);
			discCountText.anchor.x = Math.round(discCountText.width * 0.5) / discCountText.width;
		}
    },
	
	// right now, I'm just looking at 1-5 discs
	decreaseDiscs: function() {
		if (discCount>1) discCount--;
	},
	
	increaseDiscs: function() {
		if (discCount<5) discCount++;
	}
};