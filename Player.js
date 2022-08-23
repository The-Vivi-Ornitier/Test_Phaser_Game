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
        this.accelBase = 1200;
        this.accel = 1200;
        this.xMove = 0;
        this.yMove = 0;


        this.upgradeList = [];

        this.damBase = 1;
        this.damMul = 1;
        this.damFinal = 1;
        this.speedBase = 400;
        this.speedMul = 1;
        this.speedFinal = 400;

        this.attackSpeedBase = 500;
        this.attackSpeedMul = 1;

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
        selectedUpgrade.updateOnce(this.scene);
        //do upgrade stuff here
        this.damBase += selectedUpgrade.damAdd;
        this.damMul += selectedUpgrade.damMul
        this.damFinal = this.damBase * this.damMul;

        this.speedBase += selectedUpgrade.speedAdd;
        this.speedMul += selectedUpgrade.speedMul
        this.speedFinal = this.speedBase * this.speedMul;

        this.body.maxVelocity.x = this.speedFinal;
        this.body.maxVelocity.y = this.speedFinal;
        this.accel = this.accelBase*(this.speedMul+3)*.25;//make accel grow slower because otherwise we're very flighty, very quickly,
        
        this.attackSpeedMul += selectedUpgrade.attackSpeedAdd;
        this.scene.bulletTimer.timeScale = this.attackSpeedMul;
    }
}