import eventsCenter from "../EventsCenter.js";
import Player from "../Player.js";
import Enemy from "../Enemy.js";
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
        this.unlockedIDs = ['1', '2', '3'];

        //load upgrades here?

    };

    preload() {
        //load assets + images
        this.load.image('vivi', 'assets/vivi.png');
        this.load.image('orb', 'assets/ring.png');

        //generate enemy texture
        this.enemyGraphic = this.make.graphics({ x: 0, y: 0, add: false });
        this.enemyGraphic.fillStyle(0xff0000, 1);
        //  32px radius on the corners
        this.enemyGraphic.fillRoundedRect(0, 0, 100, 100, 32);
        this.enemyGraphic.generateTexture('enemyTexture', 100, 100);
    }



    create() {

        //run other scenes simul
        this.scene.run('SceneUI');
        //this.scene.run('SceneUpgrade');//should maybe not be always up? fixed :)


        //load player and get inputs
        this.player = this.physics.add.existing(new Player(this, 840, 525));
        this.player.setScale(.1);
        this.player.setCollideWorldBounds(true);
        this.keys = this.input.keyboard.createCursorKeys();


        //just make one enemy at the start to test
        this.tempEnemy = this.physics.add.existing(new Enemy(this, 0, 0));
        this.enemyGroup = this.physics.add.group();
        this.enemyGroup.add(this.tempEnemy);
        this.tempEnemy.setCollideWorldBounds(true);
        //this.physics.add.existing(tempEnemy);

        //test xp logic
        this.xpgroup = this.physics.add.group();
        this.xp = this.xpgroup.create(Phaser.Math.Between(50, 600), Phaser.Math.Between(50, 600), 'orb');

        this.physics.add.overlap(this.player, this.xpgroup, this.collectOrb, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.playerHit, null, this);

        //this.cameras.main.startFollow(this.player);//maybe this is better?
        this.scene.bringToTop('SceneUI');


        //set listeners
        eventsCenter.on('upgradeComplete', this.completeUpgrade, this);
        eventsCenter.on('resumeGame', this.resumeGame, this);
        this.input.keyboard.on('keydown-ESC', this.pauseGame, this);
    }

    update() {


        this.player.update(this.keys); //pass inputs to player character class


        //make enemy run to player
        this.enemyGroup.children.each(child => {
            this.physics.moveToObject(child, this.player, 250);
        })

    }

    pauseGame() {
        this.scene.launch('ScenePause');
        this.scene.pause();
    }

    resumeGame() {
        this.scene.resume();
    }

    //when you pick up xp
    collectOrb(player, xp) {
        xp.disableBody(true, true);

        this.xpCount += 1;

        eventsCenter.emit('xpCollect', this.xpCount);

        if (this.xpCount == this.xpToUpgrade) {
            this.scene.pause();
            this.scene.launch('SceneUpgrade', this.upgrades);

        }

        var xp = this.xpgroup.create(Phaser.Math.Between(50, 1590), Phaser.Math.Between(50, 1000), 'orb');//refine randomness
    }

    //fires when you finish taking an upgrade
    completeUpgrade() {
        this.xpCount = 0;
        this.xpToUpgrade = this.xpToUpgrade + 1;
        this.scene.resume();
    }

    playerHit(){
        console.log('dedlol')
    }
}