export default class Fruit extends Phaser.Physics.Matter.Image{

    constructor(scene,x,y,config)
    {
        super(scene.matter.world,x,y,config.key)
        scene.add.existing(this)

        this.setCollisionGroup(1)

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

        this.setOnCollide(pair => {
            let fruitA = pair.bodyA;
            let fruitB = pair.bodyB;
            if ((fruitA.gameObject instanceof Fruit && fruitB.gameObject instanceof Fruit) &&
                fruitA.gameObject.texture.key == fruitB.gameObject.texture.key)
            {
                let newX = (fruitA.position.x + fruitB.position.x) / 2;
                let newY = (fruitA.position.y + fruitB.position.y) / 2;

                let number = scene.numberFromString.get(fruitA.gameObject.texture.key)
                fruitA.gameObject.destroy()
                fruitB.gameObject.destroy()
                scene.actualizeText(number * 2)

                if (number < 11)
                {
                    scene.fruitGroup.add(new Fruit(scene,newX,newY, scene.getFruitConfig('fruit' + (number + 1))))
                }
            }
        })

        this.setScale(config.scale)
    }
}