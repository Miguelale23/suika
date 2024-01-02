export default class boot extends Phaser.Scene{

    constructor()
    {
        super({key:'boot'})
    }

    preload()
    {
        
    }

    create()
    {
        this.scene.start('level',{difficulty:2})
    }
}