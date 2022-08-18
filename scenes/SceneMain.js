import eventsCenter from "../EventsCenter.js";

export default class SceneMain extends Phaser.Scene {

    constructor() {
        super("SceneMain");
    }

    init() {
        // game variables
        this.xpCount = 0;
        this.xpToUpgrade = 1;
        
    };

    preload() {
        //load assets + images
        this.load.image('vivi', 'assets/vivi.png');
        this.load.image('orb', 'assets/ring.png');
    }



    create() {

        this.scene.run('SceneUI');
        this.scene.run('SceneUpgrade');

        this.add.rectangle(0, 0, 1680, 1050, 0x000000).setOrigin(0, 0);
        //this.xpText = this.add.text(16, 16, 'XP: 0', { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        //box = this.add.rectangle(840, 525, 100, 100, 0x1d9c19);
        this.player = this.physics.add.sprite(840, 525, 'vivi');
        this.player.setScale(.1);
        //this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.xpgroup = this.physics.add.group();
        this.xp = this.xpgroup.create(Phaser.Math.Between(50, 600), Phaser.Math.Between(50, 600), 'orb');

        this.physics.add.overlap(this.player, this.xpgroup, this.collectOrb, null, this);

        this.cameras.main.startFollow(this.player);
        this.scene.bringToTop('SceneUI');

        eventsCenter.on('upgradeComplete', this.completeUpgrade, this);
        eventsCenter.on('resumeGame', this.resumeGame, this);
    }

    update() {

        this.input.keyboard.on('keydown-' + 'ESC', function (event) {
            eventsCenter.emit('pauseGame');
            this.scene.pause();
            //this.scene.launch('ScenePause');
            //this.scene.pause();
            //this.scene.run('ScenePause');
        }, this);

        if (this.cursors.left.isDown) {
            if (this.cursors.up.isDown || this.cursors.down.isDown) {
                this.player.setVelocityX(-212);
            }
            else {
                this.player.setVelocityX(-300);
            }

            //player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            if (this.cursors.up.isDown || this.cursors.down.isDown) {
                this.player.setVelocityX(212);
            }
            else {
                this.player.setVelocityX(300);
            }

            //player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            //player.anims.play('turn');
        }

        if (this.cursors.up.isDown) {
            if (this.cursors.right.isDown || this.cursors.left.isDown) {
                this.player.setVelocityY(-212);
            }
            else {
                this.player.setVelocityY(-300);
            }

            //player.anims.play('left', true);
        }
        else if (this.cursors.down.isDown) {
            if (this.cursors.right.isDown || this.cursors.left.isDown) {
                this.player.setVelocityY(212);
            }
            else {
                this.player.setVelocityY(300);
            }

            //player.anims.play('right', true);
        }
        else {
            this.player.setVelocityY(0);

            //player.anims.play('turn');
        }


    }

    resumeGame(){
        this.scene.resume();
    }

    collectOrb(player, xp) {
        xp.disableBody(true, true);

        this.xpCount += 1;

        eventsCenter.emit('xpCollect', this.xpCount);

        if(this.xpCount == this.xpToUpgrade){
            this.scene.pause();
            //this.scene.launch('SceneUpgrade', this.player);
            eventsCenter.emit('upgradeGet');
            
        }

        var xp = this.xpgroup.create(Phaser.Math.Between(50, 1590), Phaser.Math.Between(50, 1000), 'orb');//refine randomness
    }

    completeUpgrade(){
        this.xpCount = 0;
        this.xpToUpgrade = this.xpToUpgrade + 1;
        this.scene.resume();
    }
}