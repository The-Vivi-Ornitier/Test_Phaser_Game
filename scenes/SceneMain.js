import eventsCenter from "../EventsCenter.js";
import Player from "../Player.js";
import Enemy from "../Enemy.js";
import { upgradeArray } from "../upgrades/upgradesHandler.js";
import Bullet from "../Bullet.js";

export default class SceneMain extends Phaser.Scene {

    constructor() {
        super("SceneMain");
        //set listeners
        eventsCenter.on('upgradeComplete', this.completeUpgrade, this);
        eventsCenter.on('resumeGame', this.resumeGame, this);
        eventsCenter.on('removeUpgrade', this.removeUpgrade, this);
        eventsCenter.on('addUpgradesID', this.addUpgradeByID, this);
        eventsCenter.on('playerDeath', this.playerDeath, this);

        this.unlockedUpgrades = new Array();
        this.unlockedUpgrades.push('2');
    }

    init() {
        // game variables
        this.playerDead = 1;
        this.enemySpawnCount = 0;
        this.xpCount = 0;
        this.xpToUpgrade = 1;
        this.upgradeCount = 3;
        this.upgrades = new Array();

        this.invulnFlag = 0;
        //temp "save file" of which upgrades are unlocked
        this.unlockedUpgrades.forEach(upgradeID => {
            upgradeArray.forEach(upgrade => {
                if(upgradeID == upgrade.id){
                    this.upgrades.push(upgrade);
                }
            });
        });

        var test = true;
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

        var circle = new Phaser.Geom.Circle(10, 10, 10);
        this.circleGraphic = this.add.graphics();
        this.circleGraphic.fillStyle(0xff0000, 1);
        this.circleGraphic.fillCircleShape(circle);
        //this.circleGraphic.fillStyle(0xff0000, 1);
        //this.circleGraphic.strokeCircle(0, 0, 10);

        this.circleGraphic.generateTexture('circleTexture', 20, 20);
    }



    create() {

        //run other scenes simul
        this.scene.launch('SceneUI');
        //this.scene.run('SceneUpgrade');//should maybe not be always up? fixed :)


        //load player and get inputs
        this.playerDead = 1;
        if (typeof this.player !== 'undefined') {
            // the player already exists
        }
        this.player = this.physics.add.existing(new Player(this, 840, 525));
        this.player.setScale(.1);
        this.player.setCollideWorldBounds(true);
        this.playerDead = 0;
        this.keys = this.input.keyboard.createCursorKeys();

        //summon one starting enemy
        this.enemyGroup = this.physics.add.group();
        this.summonEnemy();

        //init timer for spawning enemies
        this.enemySpawnTimer = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: this.summonEnemy,
            callbackScope: this
        })

        //init bullet making logic
        this.primaryBulletGroup = this.physics.add.group();//bullet group for primary weapon
        this.bulletTimer = this.time.addEvent({
            delay: 500,
            loop: true,
            callback: this.fireBullet,
            callbackScope: this
        })

        this.bulletGroup = this.physics.add.group();//bullet broup to test collision for ALL bullets

        //test xp logic
        this.xpgroup = this.physics.add.group();
        this.xp = this.xpgroup.create(Phaser.Math.Between(50, 600), Phaser.Math.Between(50, 600), 'orb');

        this.physics.add.overlap(this.player, this.xpgroup, this.collectOrb, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.playerHit, null, this);
        this.physics.add.overlap(this.enemyGroup, this.bulletGroup, this.enemyHit, null, this);

        //this.cameras.main.startFollow(this.player);//maybe this is better?
        this.scene.bringToTop('SceneUI');

        
        this.input.keyboard.on('keydown-ESC', this.pauseGame, this);
        
    }

    update() {

        this.bulletTimer;

        if (this.playerDead == 0) {
            // if the player already exists
            this.player.update(this.keys); //pass inputs to player character class

            //make enemy run to player
        this.enemyGroup.children.each(child => {
            this.physics.moveToObject(child, this.player, 250);
        })
        }
        


        

    }

    pauseGame() {
        this.scene.launch('ScenePause');
        this.scene.pause();
    }

    resumeGame() {
        this.scene.resume();
    }

    fireBullet(){
        var bullet = this.physics.add.existing(new Bullet(this, this.player.x, this.player.y, this.player.damFinal, this.player.pierce));
        this.bulletGroup.add(bullet);
        this.primaryBulletGroup.add(bullet)
        bullet.setVelocity(0,-500);
        //this.bulletGroup.create(this.player.x, this.player.y, 'circleTexture');
        //this.
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

        //var xp = this.xpgroup.create(Phaser.Math.Between(50, 1590), Phaser.Math.Between(50, 1000), 'orb');//refine randomness
    }

    //fires when you finish taking an upgrade
    completeUpgrade() {
        this.xpCount = 0;
        this.xpToUpgrade += 1;
        this.scene.resume();
    }

    //remove upgrades from the deck
    removeUpgrade(finishedUpgrades){
        finishedUpgrades.forEach(upgrade => {
            var index = this.upgrades.indexOf(upgrade);
            if (index > -1) { // only splice array when item is found
                this.upgrades.splice(index, 1); // 2nd parameter means remove one item only
            }
        });
    }

    //add upgrades that can be drawn on future level ups
    addUpgrade(upgradesToAdd){
        upgradesToAdd.forEach(upgrade => {
                this.upgrades.push(upgrade); 
        });
    }

    addUpgradeByID(upgradeids){
        var upgradesToAdd = new Array();
        upgradeids.forEach(id => {
            upgradeArray.forEach(upgrade => {
                if(upgrade.id == id){
                    upgradesToAdd.push(upgrade);
                }
            });
        });
        this.addUpgrade(upgradesToAdd)
    }

    playerHit(){

        if(!this.invulnFlag){
            this.invulnFlag = 1;//start invuln period

            eventsCenter.emit('playerHealthUpdate', -1);

            this.invulnTimer = this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: this.stopInvuln,
                callbackScope: this
            })
        }

        //eventsCenter.emit('playerHit');
        console.log('dedlol')
    }

    stopInvuln(){
        this.invulnFlag = 0;
    }

    playerDeath(){
        if(!this.unlockedUpgrades.includes('1')){
            this.unlockedUpgrades.push('1');
        }
        this.playerDead = 1;
        eventsCenter.emit('playerDead');
        this.scene.pause();
        this.player.destroy();
        this.scene.launch('SceneEndGame');
        this.scene.stop('SceneUI');
        eventsCenter.emit('updateUpgradeSaveArray', this.unlockedUpgrades);
        this.scene.stop();

    }

    enemyHit(enemy, bullet){
        //check if this bullet has already damaged the enemy
        if(!bullet.enemiesHit.includes(enemy.ID)){
            if(bullet.pierce == 0){//check if it pierces
                bullet.destroy();
            }else{
                bullet.pierce--;
                bullet.enemiesHit.push(enemy.ID);
            }
            enemy.shot(bullet);//calculate the hit
            console.log('pewpew');
        }
    }

    summonEnemy(){
        this.enemySpawnCount+=1;
        var health = 2*(Math.floor(1+this.enemySpawnCount/5));//math for scaling health
        var tempEnemy = this.physics.add.existing(new Enemy(this, Phaser.Math.Between(0,1680), 0, health, this.enemySpawnCount));
        //this.enemyGroup = this.physics.add.group();
        this.enemyGroup.add(tempEnemy);
        tempEnemy.setCollideWorldBounds(true);
    }
}