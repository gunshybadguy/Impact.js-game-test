ig.module(

	'game.entities.player'
)

.requires(

	'impact.entity'

)

.defines(function(){


// let's get defining!! 

EntityPlayer = ig.Entity.extend({

	// player characteristics:

	size: {x:40, y:88},
	offset: {x: 17, y: 10},
	maxVel: {x:400, y:800},
	friction: {x: 800, y: 0},
	
	flip: false,
	accelGround:1200,
	jump: 950,	
	accelAir: 600,
	
	// Let's handle group and collisions

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,


	// animations sheet

	animSheet: new ig.AnimationSheet( 'media/player.png', 75, 100),

	

	init: function(x,y,settings){

		this.parent(x,y,settings);

		// add animation via spite frames:

		this.addAnim( 'idle',0.5, [15,15,15,15,15,14] );
		this.addAnim( 'run', 0.07, [4,5,11,0,1,2,7,8,9,3] );
		this.addAnim( 'jump', 1, [13] );


		// set ref to player on the game instance 

		ig.game.player = this; 


	}, // init 

	update: function(){

		// update movements

		// accelation = if still moveforward or jump depending. 
		var accel = this.standing ? this.accelGround : this.accelAir; 
		
		// LEFT: GO BACK
		if (ig.input.state('left')){

			this.accel.x = -accel;
			this.flip = true;  
		}

		// RIGHT: GO FORWARD

		else if (ig.input.state('right')){

			this.accel.x = accel; 
			this.flip = false;
		}

		// OR BE STILL
		else { this.accel.x = 0 ; }


		// JUMP
		if( this.standing && ig.input.pressed('jump') ) {
			this.vel.y = -this.jump;
		}

		// Do a double jump

		else if (this.vel.y < 0 && ig.input.pressed('jump')){

			this.vel.y = -this.jump;
		}


		// Animations for when we move:

		if ( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		}

		else if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.jump;
		}

		else {
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;


		// MOVE!!
		this.parent(); 



	}, // update

	kill: function() {
		this.parent();

		// Reload this level
		ig.game.reloadLevel();
	},



}); // entityplayer 

}); // defines