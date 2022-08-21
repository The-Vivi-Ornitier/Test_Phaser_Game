import eventsCenter from "./EventsCenter.js";

export default class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'vivi'); // The frame is optional 
        //this= this.physics.add.sprite(840, 525, 'vivi');
        //this.setCollideWorldBounds(true);
        scene.physics.world.enable(this);
        this.scene.add.existing(this);


        this.body.maxVelocity.x = 400;
        this.body.maxVelocity.y = 400; //acceleration and drag logic, not a fan, might change
        this.body.setDamping(true);
        this.body.setDrag(.01);
        this.accel = 1200;
        this.xMove = 0;
        this.yMove = 0;


        this.upgradeList = [];

        //listen for an upgrade to be selected and add it to the player
        eventsCenter.on('selectedUpgrade', this.processUpgrade, this);
    }

    create(){
        //eventsCenter.on('selectedUpgrade', this.processUpgrade(selectedUpgrade), this);
    }

    update(keys){



        //update movement
        if(keys.left.isDown && !keys.right.isDown){
            this.xMove = -1;
        }
        else if (keys.right.isDown ){
            this.xMove = 1;
        }
        else{
            this.xMove = 0;
        }
        if(keys.up.isDown && !keys.down.isDown){
            this.yMove = -1;
        }
        else if (keys.down.isDown ){
            this.yMove = 1;
        }
        else{
            this.yMove = 0;
        }

        this.setAcceleration(this.accel*this.xMove, this.accel*this.yMove);
    }

    //add a given upgrade to the player
    processUpgrade(selectedUpgrade){
        this.upgradeList.push(selectedUpgrade);
        //do upgrade stuff here
    }
}