import eventsCenter from "../EventsCenter.js";

export default class Upgrade{

    constructor(){
        //upgrade info
        this.name = 'Upgrade Template';
        this.desc = 'Upgrade Description';
        this.icon = 'upgrade_icon_key';

        this.type = 'upgrade';//useful for grouping upgrades

        this.currentLevel = 0;
        this.maxLevel = 5;
        

        //save stat change information here to be loaded onto the character when chosen
        this.damAdd = 0;
        this.damMul = 1;
        this.speedAdd = 0;
        this.speedMul = 1;

        this.attackSpeedAdd = 0;
    }


    updateEvery(damage, effects){
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