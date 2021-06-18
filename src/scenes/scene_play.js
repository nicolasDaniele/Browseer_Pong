import Palletes from "../gameObjects/palletes.js";

class Scene_play extends Phaser.Scene {
    constructor(){
        super({key: "Scene_play"});
    }

    create(){
        let center_width = this.sys.game.config.width / 2;
        let center_height = this.sys.game.config.height / 2;

        // Separator
        this.add.image(center_width, center_height, "separator");

        // Palletes
        this.lp = new Palletes(this, 50, center_height, "left_pallete");
        this.rp = new Palletes(this, this.sys.game.config.width - 50, center_height, "right_pallete");

        // Ball
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, "ball");
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);
        this.ball.setVelocityX(180);

        // Collisions
        this.physics.add.collider(this.ball, this.lp, this.palleteCollision, null, this);
        this.physics.add.collider(this.ball, this.rp, this.palleteCollision, null, this);

        // Controlls
        // Right pallete
        this.cursor = this.input.keyboard.createCursorKeys();

        // Left pallete
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    palleteCollision(){
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }

    update(){
        // Ball respawn
        if(this.ball.x < 0 || this.ball.x > this.sys.game.config.width){
            this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        }

        // Palletes movement
        // Right pallete
        if(this.cursor.down.isDown){
            this.rp.body.setVelocityY(300);
        }
        else if(this.cursor.up.isDown){
            this.rp.body.setVelocityY(-300);
        }
        else{
            this.rp.body.setVelocityY(0);
        }

        // Left pallete
        if(this.cursor_S.isDown){
            this.lp.body.setVelocityY(300);
        }
        else if(this.cursor_W.isDown){
            this.lp.body.setVelocityY(-300);
        }
        else{
            this.lp.body.setVelocityY(0);
        }
    }
}

export default Scene_play;