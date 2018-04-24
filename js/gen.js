// for general stuff that I don't want in other files because I don't want to read them anymore
var cloudcounters, cloudimages, clouddelays;

var gen = {
	
	preloadClouds: function() {		
		game.load.image('cloud1', './assets/cloud1.png');
		game.load.image('cloud2', './assets/cloud2.png');
		game.load.image('cloud3', './assets/cloud3.png');
		game.load.image('riverbank', './assets/riverbank.png');
		game.load.image('bg_sky', './assets/bg_sky.png');
	},
	
	// really wanted the clouds to be on global lists, but I just couldn't get them to move after switching state fsr
	createClouds: function() {
		cloudcounters = [0,0,0];
		cloudimages = [];
		clouddelays = [[10,1],[7,1],[4,1]];
		
		cloudimages.push(game.add.sprite(400, 0, 'cloud1'));
		cloudimages.push(game.add.sprite(100, 50, 'cloud2'));
		cloudimages.push(game.add.sprite(300, 100, 'cloud3'));
		// console.log(cloudcounters);
	},
	
	updateClouds: function() {
		// move cloud every so ticks
		for (var i=0; i<3; i++) {
			cloudcounters[i]++;
			if (cloudcounters[i]%clouddelays[i][0]==0) {
				cloudimages[i].x -= clouddelays[i][1];
				if (cloudimages[i].x < 0-cloudimages[i].width) cloudimages[i].x = 600;
			}
		}
	},
	
	arraysEqual: function (arr1, arr2) {
		if(arr1.length !== arr2.length)
			return false;
		for(var i = arr1.length; i--;) {
			if(arr1[i] !== arr2[i])
				return false;
		}
		return true;
	}
};