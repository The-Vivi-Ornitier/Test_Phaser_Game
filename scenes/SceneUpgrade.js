import eventsCenter from "../EventsCenter.js";
import UpgradeCards from "../UpgradeCards.js";

export default class SceneUpgrade extends Phaser.Scene {

    constructor() {
        super("SceneUpgrade");
    }

    init(){

        this.backText = this.add.text(840,1000, 'UPGRADE GET');
        this.upgrades;
    }

    create() {
        this.scene.setVisible(false);
        this.upgrades = this.add.group();
        eventsCenter.on('upgradeGet', this.upgradeGet, this);
        this.backText.on('pointerdown', () => this.resumeButton());
    }
 
    //test button to continue without an upgrade
    //could also just call after getting it
    resumeButton() {
         this.scene.setVisible(false);//prob better way to do this
         this.backText.disableInteractive();
         this.upgrades.clear(true,true);//empty group and delete the old graphics
         eventsCenter.emit('upgradeComplete');
    }

    //initialize upgrade choices on level
    upgradeGet(upgradeArray){
        //backText.setColor(0x000);
        this.scene.setVisible(true);
        this.upgrade1 = new UpgradeCards(this, 150, 100, upgradeArray[Phaser.Math.Between(0,upgradeArray.length-1)]);
        this.upgrade2 = new UpgradeCards(this, 650, 100, upgradeArray[Phaser.Math.Between(0,upgradeArray.length-1)]);
        this.upgrade3 = new UpgradeCards(this, 1150, 100, upgradeArray[Phaser.Math.Between(0,upgradeArray.length-1)]);
        this.upgrades.add(this.upgrade1);
        this.upgrades.add(this.upgrade2);
        this.upgrades.add(this.upgrade3);
        this.scene.bringToTop('SceneUpgrade');
        this.backText.setInteractive({ useHandCursor: true });
        //this.scene.setInteractive();
    }

}