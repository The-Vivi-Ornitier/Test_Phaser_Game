import eventsCenter from "../EventsCenter.js";

export default class Upgrade{

    constructor(){
        //super();
        //upgrade info
        this.name = 'Upgrade Template';
        this.desc = 'Upgrade Description';
        this.icon = 'upgrade_icon_key';
        this.id = '0';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 5;
        

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