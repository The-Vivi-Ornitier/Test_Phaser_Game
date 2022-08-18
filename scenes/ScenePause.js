export default class ScenePause extends Phaser.Scene {

    constructor() {
        super("ScenePause");
    }

    create() {
        //var bg = this.add.sprite(0,0,'background_1');
        //bg.setOrigin(0,0);

        var text = 'PAUSED'

        //var startText = this.add.text(100,100, text);

        // Add go back button to title screen
       var backText = this.add.text(840,525, 'Resume');
       //backText.setColor(0x000);
       backText.setInteractive({ useHandCursor: true });
       backText.on('pointerdown', () => this.resumeButton());
       
   }

   resumeButton() {
        //this.scene.resume('SceneMain');
        //this.scene.remove('ScenePause');
        this.scene.switch('SceneMain');
   }

}