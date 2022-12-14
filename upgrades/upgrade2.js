import Upgrade from "./upgradeBase.js";

export default class Upgrade2 extends Upgrade{

    constructor(){
        super();
        //upgrade info
        this.name = 'Damage Upgrade';
        this.desc = 'Increase base damage by 1';
        this.icon = 'upgrade_icon_key';
        this.id = '2';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 999;//make this upgrade pretty much always available as a default, just in case
        

        //save stat change information here to be loaded onto the character when chosen
        this.damAdd = 1;
        this.damMul = 1;
        this.speedAdd = 0;
        this.speedMul = 1;
    
        this.attackSpeedAdd = 0;
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