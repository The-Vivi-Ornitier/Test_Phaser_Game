import eventsCenter from "../EventsCenter.js";
import Player from "../Player.js";
import { upgradeArray } from "../upgrades/upgradesHandler.js";

export default class SceneMain extends Phaser.Scene {

    constructor() {
        super("SceneMain");
    }

    init() {
        // game variables
        this.xpCount = 0;
        this.xpToUpgrade = 1;
        this.upgradeCount = 3;
        this.upgrades = upgradeArray;
        //this.upgradeArray = upgradeArray;
        //temp "save file" of which upgrades are unlocked
        this.unlockedIDs = ['1','2','3'];

        //load upgrades here?
        
    };

    preload() {
        //load assets + images
        this.load.image('vivi', 'assets/vivi.png');
        this.load.image('orb', 'assets/ring.png');
    }



    create() {

        //run other scenes simul
        this.scene.run('SceneUI');
        this.scene.run('SceneUpgrade');//should maybe not be always up?


        //load player and get inputs
        this.player = this.physics.add.existing(new Player(this, 840, 525));
        this.player.setScale(.1);
        this.player.setCollideWorldBounds(true);
        this.keys = this.input.keyboard.createCursorKeys();


        //test xp logic
        this.xpgroup = this.physics.add.group();
        this.xp = this.xpgroup.create(Phaser.Math.Between(50, 600), Phaser.Math.Between(50, 600), 'orb');

        this.physics.add.overlap(this.player, this.xpgroup, this.collectOrb, null, this);

        //this.cameras.main.startFollow(this.player);//maybe this is better?
        this.scene.bringToTop('SceneUI');


        //set listeners
        eventsCenter.on('upgradeComplete', this.completeUpgrade, this);
        eventsCenter.on('resumeGame', this.resumeGame, this);
    }

    update() {

        //game pausing logic
        this.input.keyboard.on('keydown-' + 'ESC', function (event) {
            eventsCenter.emit('pauseGame');
            this.scene.pause();
        }, this);

        this.player.update(this.keys); //pass inputs to player character class

    }

    resumeGame(){
        this.scene.resume();
    }

    //when you pick up xp
    collectOrb(player, xp) {
        xp.disableBody(true, true);

        this.xpCount += 1;

        eventsCenter.emit('xpCollect', this.xpCount);

        if(this.xpCount == this.xpToUpgrade){
            this.scene.pause();
            //this.scene.launch('SceneUpgrade', this.player);
            eventsCenter.emit('upgradeGet', this.upgrades);
            
        }

        var xp = this.xpgroup.create(Phaser.Math.Between(50, 1590), Phaser.Math.Between(50, 1000), 'orb');//refine randomness
    }

    //fires when you finish taking an upgrade
    completeUpgrade(){
        this.xpCount = 0;
        this.xpToUpgrade = this.xpToUpgrade + 1;
        this.scene.resume();
    }
}