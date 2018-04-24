var gamestate, ghostlocation, ghostimage, x, y, tower_goal, first_array, moves, discPositions, c, selector_sprite, selector_idx, selector_counter, selector_delay, moveText;

var Hanoi = {
	
	preload : function() {
		game.load.image('arrow', './assets/arrow.png');
		game.load.image('whole', './assets/ghost_whole.png');
		game.load.image('selector', './assets/point.png');
		game.load.image('selector2', './assets/point2.png');
		game.load.image('1', './assets/1red.png');
		game.load.image('2', './assets/2yellow.png');
		game.load.image('3', './assets/3green.png');
		game.load.image('4', './assets/4blue.png');
		game.load.image('5', './assets/5violet.png');
	},
	
	create : function() {
		
		// initialize disc graphic positions (will be anchored to center)
		discPositions = [null];
		for (var i=1; i<=3; i++) {
			var posList = [null];
			for (var j=1; j<=5; j++) {
				// spacing their centers 45 apart vertically, and 200 apart horizontally
				posList.push([100+(i-1)*200, 350-(j-1)*45]);
			}
			discPositions.push(posList);
		}
		
		// target
		tower_goal = [0];
		for (var i=1; i<=discCount; i++) tower_goal.push(i);
		first_array = tower_goal.slice();
		
		// the original state of the pegs
		gamestate = [null,first_array,[0],[0]];

		// init
		moves = 0;
		ghostlocation = 0;
		
		// bg images
		this.add.sprite(0, 0, 'bg_sky');
		gen.createClouds(this);
		this.add.sprite(0, 0, 'riverbank');
		
		// the selectors
		selector_sprite = this.add.sprite(100,100,'selector');
		selector_sprite.anchor.set(0.5);
		selector2_sprite = this.add.sprite(-100,100,'selector2');
		selector2_sprite.anchor.set(0.5);
		arrow_sprite = this.add.sprite(-100,0,'arrow');
		arrow_sprite.anchor.set(0.5);
		selector_idx = 1;
		selector_delay = 30;
		selector_counter = 60;
		
		// the whole screen as a button
		this.add.button(0, 0, 'whole', this.button_press, this);
		
		// initialize discs
		c = [null];
		c.push(game.add.sprite(100, discPositions[1][1][1], '1'));
		if (discCount>1) c.push(game.add.sprite(100, discPositions[1][2][1], '2'));
		if (discCount>2) c.push(game.add.sprite(100, discPositions[1][3][1], '3'));
		if (discCount>3) c.push(game.add.sprite(100, discPositions[1][4][1], '4'));
		if (discCount>4) c.push(game.add.sprite(100, discPositions[1][5][1], '5'));
		
		for (var i=1; i<c.length; i++) c[i].anchor.set(0.5);
		
		textStyle_Value = { font: "bold 20px arial", fill: "#000", align: "center"};
		moveText = game.add.text(game.world.centerX, 20, "MOVES: " + moves.toString(), textStyle_Value);
		moveText.anchor.x = Math.round(moveText.width * 0.5) / moveText.width;
	},
	
	update : function() {
		
		if (!music.isPlaying) music.play();
		
		// choose sprite of selector
		if (ghostlocation==0) {
			selector_sprite.x = (selector_idx-1)*200+100;
			selector2_sprite.x = -100;
		} else {
			selector2_sprite.x = (selector_idx-1)*200+100;
			selector_sprite.x = -100;
		}
		
		// handle selector movement
		if (selector_counter<0) {
			selector_idx%=3;
			selector_idx++;
			selector_counter = selector_delay;
		} else {
			selector_counter--;
		}

		// handle arrow lock selection
		if (ghostlocation!=0) {
			arrow_sprite.x = discPositions[ghostlocation][gamestate[ghostlocation].length-1][0];
			arrow_sprite.y = discPositions[ghostlocation][gamestate[ghostlocation].length-1][1]-70;
		} else arrow_sprite.x = -100;
		
		// check if win
		if (gen.arraysEqual(tower_goal,gamestate[3])) game.state.start('Game_Over');
		
		gen.updateClouds();
		
		moveText.text = "MOVES: " + moves.toString();
	},
	
	move : function (x,y) {
		// move from x to y
		if (gamestate[x].length>1) {
			var a = gamestate[x].pop();
			var b = gamestate[y].pop();
			if (a > b) {
				gamestate[y].push(b); //put back
				gamestate[y].push(a); //new stack
				c[a].x = discPositions[y][gamestate[y].length-1][0];
				c[a].y = discPositions[y][gamestate[y].length-1][1];
				moves++;
			}
			else {				
				// illegal; put back
				gamestate[y].push(b);
				gamestate[x].push(a);
			}
		}
	},
	
	me_one: function () {
		if (ghostlocation==0) {
			if (gamestate[1].length>1) ghostlocation = 1;
		}
		else  {
			if (ghostlocation==2) this.move(2,1);
			else if (ghostlocation==3) this.move(3,1);
			ghostlocation = 0;
		}
    },
	
	me_two: function () {
		if (ghostlocation==0) {
			if (gamestate[2].length>1) ghostlocation = 2;
		}
		else  {
			if (ghostlocation==1) this.move(1,2);
			else if (ghostlocation==3) this.move(3,2);
			ghostlocation = 0;
		}
    },
	
	me_three: function () {
		if (ghostlocation==0) {
			if (gamestate[3].length>1) ghostlocation = 3;
		}
		else  {
			if (ghostlocation==1) this.move(1,3);
			else if (ghostlocation==2) this.move(2,3);
			ghostlocation = 0;
		}
    }, 
	
	button_press: function () {
		if (selector_idx==1) this.me_one();
		if (selector_idx==2) this.me_two();
		if (selector_idx==3) this.me_three();
	},
	
	whatdiscisontop: function(column) {
		var x = gamestate[column].pop;
		gamestate[column].push(x);
		return x;
	},
	
};