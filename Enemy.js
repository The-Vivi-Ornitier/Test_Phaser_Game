import eventsCenter from "./EventsCenter.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'enemyTexture'); // The frame is optional 
        //this= this.physics.add.sprite(840, 525, 'vivi');
        //this.setCollideWorldBounds(true);
        //scene.physics.world.enable(this);
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);


        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 200; //acceleration and drag logic, not a fan, might change
        this.body.setDamping(true);
        this.body.setDrag(.01);
        this.accel = 1200;
        this.xMove = 0;
        this.yMove = 0;

        this.health = 2;

        //this.upgradeList = [];

        //listen for an upgrade to be selected and add it to the player
        //eventsCenter.on('selectedUpgrade', this.processUpgrade, this);
    }

    create(){

    }

    update(playerX, playerY){
        //this.physics.moveToObject(player);
        //this.physics.moveTo(this, playerX, playerY);
        //this.setAcceleration(50);
    }

    //calls when the enemy is hit
    shot(bullet){
        this.health-=bullet.damage;
        if(this.health <1){

            this.scene.xpgroup.create(this.x, this.y, 'orb');
            this.scene.summonEnemy();
            this.destroy();
        }
    }
}