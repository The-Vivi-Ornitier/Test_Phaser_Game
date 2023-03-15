import Upgrade from "./upgradeBase.js";
import eventsCenter from "../EventsCenter.js"
import Bullet from "../Bullet.js";

export default class Upgrade4 extends Upgrade{

    constructor(){
        super();
        //upgrade info
        this.name = 'Butt Shot';
        this.desc = 'Fire another bullet backwards';
        this.icon = 'upgrade_icon_key';
        this.id = '4';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 1;
        

        //save stat change information here to be loaded onto the character when chosen
        this.damAdd = 0;
        this.damMul = 0;
        this.speedAdd = 0;
        this.speedMul = 0;

        this.attackSpeedAdd = 0;

        this.rearBulletTimer;
        this.scene;
    }


    updateEvery(damage, effects){
        //if an upgrade fires additional shots, logic goes here
    }

    updateOnce(scene){
        //this will be called only once when the upgrade is first taken
        this.scene = scene;
        scene.rearBulletTimer = scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: this.fireBullet,
            callbackScope: scene,
            startAt: scene.bulletTimer.getElapsed()
        })


        this.currentLevel += 1;
        if(this.currentLevel >= this.maxLevel){
            eventsCenter.emit('removeUpgrade', this);
        }
    }

    fireBullet(){
        var bullet = this.scene.scene.physics.add.existing(new Bullet(this.scene.scene, this.scene.scene.player.x, this.scene.scene.player.y, this.scene.scene.player.damFinal));
        this.scene.scene.bulletGroup.add(bullet);
        //this.primaryBulletGroup.add(bullet)
        bullet.setVelocity(0, 500);
    }
}