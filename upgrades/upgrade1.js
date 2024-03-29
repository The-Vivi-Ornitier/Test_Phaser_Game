import Upgrade from "./upgradeBase.js";
import eventsCenter from "../EventsCenter.js"

export default class Upgrade1 extends Upgrade{

    constructor(){
        super();
        //upgrade info
        this.name = 'Speed Upgrade';
        this.desc = 'Increase speed multiplier by 1x';
        this.icon = 'upgrade_icon_key';
        this.id = '1';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 2;
        

        //save stat change information here to be loaded onto the character when chosen
        this.damAdd = 0;
        this.damMul = 0;
        this.speedAdd = 0;
        this.speedMul = 2;

        this.attackSpeedAdd = 0;
    }


    updateEvery(damage, effects){
        //if an upgrade needs constant updating, do it here
    }

    updateOnce(scene, upgradeList){
        //this will be called only once when the upgrade is taken
        var level = 0;
        upgradeList.forEach(upgrade => {
            if(upgrade.id == this.id){
                level++;
            }
        });
        this.currentLevel = level;
        if(this.currentLevel >= this.maxLevel){
            var thisUpgrade = new Array;
            thisUpgrade.push(this);
            eventsCenter.emit('removeUpgrade', thisUpgrade);
        }
    }
}