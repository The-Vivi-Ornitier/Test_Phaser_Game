import eventsCenter from "./EventsCenter.js";

export default class UpgradeCards extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y, selectedUpgrade) {
        super(scene, x, y, "upgrade");
        
        var upgradeBox = this.scene.add.graphics();
        upgradeBox.fillStyle(0xfff, 1);
         //  32px radius on the corners
        upgradeBox.fillRoundedRect(x, y, 400, 800, 32);
        //make rounded rectangle

        
        //set clickability
        upgradeBox.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(x, y, 400, 800),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true,
        });
        upgradeBox.name = scene.add.text(x+200,y+50,selectedUpgrade.name,{ fontSize: '32px', fill: '#000' , align: 'center', wordWrap: { width: 400 }}).setOrigin(0.5,0.5);
        upgradeBox.desc = scene.add.text(x+200,y+650,selectedUpgrade.desc,{ fontSize: '32px', fill: '#000' , align: 'center', wordWrap: { width: 400 }}).setOrigin(0.5,0.5);
        upgradeBox.on('pointerdown', () => this.selectUpgrade(selectedUpgrade));
    }

    init(){
    }

    create() {
    }
 
    selectUpgrade(selectedUpgrade) {
        console.log('upgrade ' + selectedUpgrade.id + ' clicked');
    }

}