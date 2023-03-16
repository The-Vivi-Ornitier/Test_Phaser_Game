import Upgrade from "./upgradeBase.js";
import eventsCenter from "../EventsCenter.js";

export default class Upgrade5 extends Upgrade{

    constructor(){
        super();
        //upgrade info
        this.name = 'Piercing Shot';
        this.desc = 'Allows your bullet to pierce one enemy.';
        this.icon = 'upgrade_icon_key';
        this.id = '5';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 1;
        

        //save stat change information here to be loaded onto the character when chosen
        this.damAdd = 0;
        this.damMul = 0;
        this.speedAdd = 0;
        this.speedMul = 0;

        this.attackSpeedAdd = 0;
    }


    updateEvery(damage, effects){
        //if an upgrade fires additional shots, logic goes here
    }

    updateOnce(scene){
        //this will be called only once when the upgrade is first taken
        scene.player.pierce += 1;

        this.currentLevel += 1;
        if(this.currentLevel >= this.maxLevel){
            eventsCenter.emit('removeUpgrade', this);
        }
    }
}