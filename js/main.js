// game goes inside a State (main methods)
var GameState = {
	// load game assets/images before game starts
	preload: function() {
		this.load.image('background', 'assets/images/background.png');
		this.load.image('roofer', 'assets/images/roofer.png');
		this.load.image('container', 'assets/images/container.png');
		this.load.image('house', 'assets/images/house.png');
		this.load.image('arrow', 'assets/images/arrow.png');
		this.load.image('tile', 'assets/images/tile.png');
	},
	// executed after everything is loaded
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// create new tileSprite (x, y, h, w)
		this.background = this.game.add.tileSprite(0, 0, 360, 640, 'background');
		// create new sprite (x, y)
		// House
		this.house = this.game.add.sprite(20, 300, 'house');
		
		// Container
		this.container = this.game.add.sprite(this.game.world.centerX, 100,
			'container');
		this.roofer = this.game.add.sprite(this.game.world.centerX, this.game.world
			.centerY, 'roofer');
		// setting anchor point to the center
		this.container.anchor.setTo(0.5, 0.5);
		
		// Roofer
		this.roofer.anchor.setTo(0.5, 0.5);
		// size
		this.roofer.scale.setTo(0.9);
		// change direction
		this.roofer.scale.setTo(-1, 0.9);
		
		// Tile
		this.tile = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'tile');
		this.tile.anchor.setTo(0.5);
		tiles = game.add.group();
		tiles.enableBody = true;
		tiles.physicsBodyType = Phaser.Physics.ARCADE;
		tiles.createMultiple(50, 'tile');
		tiles.setAll('checkWorldBounds', true);
		tiles.setAll('outOfBoundsKill', true);
		
		// Arrow
		this.arrow = this.game.add.sprite(this.game.world.centerX, 250, 'arrow');
		this.arrow.anchor.setTo(0.5);
		this.arrow.scale.setTo(1, -1);
		game.physics.enable(this.arrow, Phaser.Physics.ARCADE);
		this.arrow.body.allowRotation = false;
		
	},
	// game loop per second
	update: function() {
		this.arrow.rotation = game.physics.arcade.angleToPointer(this.arrow);
		if (game.input.activePointer.isDown) {
			fire(this.arrow);
		}
		
		game.debug.text('Active Tiles: ' + tiles.countLiving() + ' / ' + tiles.total, 20, 20);
		game.debug.spriteInfo(this.arrow, 20, 500);
	}
};

var fireRate = 200;
var nextFire = 0;

function fire(arrow) {
	if (game.time.now > nextFire && tiles.countDead() > 0) {
		nextFire = game.time.now + fireRate;
		var tile = tiles.getFirstDead();
		tile.reset(arrow.x - 16, arrow.y - 6); // Adjust
		game.physics.arcade.moveToPointer(tile, 300); // Speed
	}
}


// initiate/create an empty game (framework) with Phaser.Game
var game = new Phaser.Game(360, 640, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');