export default class fruit extends Phaser.Physics.Matter.Image{

    constructor(scene,x,y,config)
    {
        super(scene.matter.world,x,y,config.key)
        scene.add.existing(this)

        this.setCircle(config.radius, {
            frictionAir: 0.05,
            friction: 0.005,
            bounce: 0,
            offsetX: 300,
            render:{
                sprite: {
                    xOffset: config.offsetX,
                    yOffset: config.offsetY
                }
            }
        })

        this.setScale(config.scale)
    }
}