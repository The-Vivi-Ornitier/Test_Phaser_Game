import eventsCenter from "./EventsCenter.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, damage, pierce)
    {
        super(scene, x, y, 'circleTexture');
        
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.damage = damage;
        this.pierce = pierce;

        this.enemiesHit = new Array();
        //this.setTexture('circleTexture');
        //this.setPosition(x, y);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if(this.y <= 0 || this.y >= 1050){
            this.destroy();
        }
    }

    create(){
        //this.setVelocity(0,5);
    }

}