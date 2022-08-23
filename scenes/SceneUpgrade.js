import eventsCenter from "../EventsCenter.js";
import UpgradeCards from "../UpgradeCards.js";

export default class SceneUpgrade extends Phaser.Scene {

    constructor() {
        super("SceneUpgrade");
    }

    init(){
        
    }

    create(upgradeArray) {
        //init and listeners
        this.backText = this.add.text(840,1000, 'Skip Upgrade');
        this.upgrades = this.add.group();
        //create the upgrade ui boxes
        this.upgrade1 = new UpgradeCards(this, 150, 100, upgradeArray[Phaser.Math.Between(0,upgradeArray.length-1)]);
        this.upgrade2 = new UpgradeCards(this, 650, 100, upgradeArray[Phaser.Math.Between(0,upgradeArray.length-1)]);
        this.upgrade3 = new UpgradeCards(this, 1150, 100, upgradeArray[Phaser.Math.Between(0,upgradeArray.length-1)]);
        this.upgrades.add(this.upgrade1);
        this.upgrades.add(this.upgrade2);
        this.upgrades.add(this.upgrade3);
        //make all the upgrades one group so theyre easy to deal with later
        this.backText.setInteractive({ useHandCursor: true });


        this.backText.on('pointerdown', () => this.closeUpgrades());
        eventsCenter.once('selectedUpgrade', this.closeUpgrades, this);
    }
 
    //test button to continue without an upgrade
    //also called after an upgrade is selected to clean up
    closeUpgrades() {
         //this.upgrades.destroy(true,true);//empty group and delete the old graphics (dont think this is necessary, should be included in scene.stop)
         eventsCenter.emit('upgradeComplete');
         this.scene.stop();
    }

}