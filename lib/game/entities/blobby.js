ig.module( 'game.entities.blobby' )

.requires( 'impact.entity' )

.defines (function(){


EntityBlobby = ig.Entity.extend({

	size: {x:40, y:28},
	offset: {x:34, y:0},
	maxVel: {x:100, y:100},
	friction: {x:150, y:0},

	speed: 36,
	flip: false,


	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,

	// animation sheet

	animSheet: new ig.AnimationSheet( 'media/blob.png', 64, 28), 
	
	// sound 
	sfxDie: new ig.Sound( 'media/sounds/blob-die.*'),


	// INIT
	init: function ( x,y, settings){

		this.parent(x,y,settings);

		this.addAnim( 'crawl', 0.2, [0.1] );
		this.addAnim( 'dead', 1, [2] ); 

		ig.game.blobby = this;


	}, // end INIT

	update: function(){

		// near an edge, return. 
		if (!ig.game.collisionMap.getTile (

			this.pos.x + (this.flip ? +4 : this.size.x -4),
			this.pos.y + this.size.y+1

			) // the condition 
			) // the if 

		{
			this.flip = !flip; 
			this.offset.x = this.flip ? 0 : 24; 

		}

		var xdir = this.flip ? -1 : 1; 
		this.vel.x = this.speed * xdir; 
		this.currentAnim.flip.x = !this.flip; 

		this.parent(); 
		// console.log(this.speed); 

		
		// ENEMY TO MOVE TOWARDS PLAYER 

		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
    	
    
         
    if ( this.distanceTo( ig.game.player) < 300 ) {
        var target = 0;
        
        target = player.pos.x;
        
        }

        // Facing Right

        if ( target < this.pos.x ) {
            
            this.flip = true;
            this.speed = 120;
            this.vel.x = this.speed * xdir;
            
        } 

        // Facing Right

        else if ( target > this.pos.x ) {
            
            this.flip = false;
            this.speed = 120;
            this.vel.x = this.speed * xdir;
            
        } 

        // NORMAL

        else {
            
            this.speed = 36;
            this.vel.x = this.speed * xdir;
            
        }




	}, // end UPDATE


	kill: function() {

		this.sfxDie.play(); 
		this.parent();

	}, // end kill


	handleMovementTrace: function(res){

		this.parent(res); 

		// collision with wall

		if (res.collision.x) {

			this.flip = !this.flip;
			this.offset.x = this.flip ? 0 :24;

		} // end if 


	}, // end HANDLEMOVEMENT


	check: function(other){

		other.receiveDamage(1, this); 

	}

	
	







}); // end EntityBlobby



}); // end defines