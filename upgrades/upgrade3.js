import Upgrade from "./upgradeBase.js";

export default class Upgrade3 extends Upgrade{

    constructor(){
        super();
        //upgrade info
        this.name = 'Attack Speed Upgrade';
        this.desc = 'Shoot faster';
        this.icon = 'upgrade_icon_key';
        this.id = '3';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 5;
        

        //save stat change information here to be loaded onto the character when chosen
        this.damAdd = 0;
        this.damMul = 1;
        this.speedAdd = 0;
        this.speedMul = 1;

        this.attackSpeedAdd = 1;
    }


    fireBullet(damage, effects){
        //if an upgrade fires additional shots, logic goes here
    }

    updateOnce(scene){
        //this will be called only once when the upgrade is first taken


        this.currentLevel += 1;
        if(this.currentLevel >= this.maxLevel){
            eventsCenter.emit('removeUpgrade', this);
        }
    }
}