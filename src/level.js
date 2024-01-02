import Fruit from './fruit.js'
export default class level extends Phaser.Scene{

    constructor()
    {
        super({key:'level'})

        this.startFruitOrder = 1;
    }

    preload()
    {
        for (let i = 1; i < 12; i++)
        {
            this.load.image('fruit' + i, './assets/sprites/fruit' + i + '.png')
        }
        this.load.image('limit', './assets/sprites/limit.png')
    }

    actualizeText(points)
    {
        this.scoreText1.destroy()
        this.scoreText2.destroy()
        this.scoreText1 = this.add.text(47,20,'123', {fontFamily:'suikaFont', fontSize: '70px'}).setDepth(5)
        this.scoreText1.setTint(0xffb10a)
        this.scoreText2 = this.add.text(50,20,'123', {fontFamily:'suikaFont', fontSize: '70px'}).setDepth(5)
        this.scoreText2.setTint(0xffd373)
    }

    getFruitConfig(key)
    {
        let config = {
            key: key,
            scale: this.fruitScale.get(key),
            radius: this.radius.get(key),
            offsetX: this.offsetX.get(key),
            offsetY: this.offsetY.get(key)
        }

        return config;
    }

    generateNextFruitRandom()
    {
        this.currentFruit = this.nextFruit; 
        let chanceOfConsecutive = Phaser.Math.Between(1,7)
        this.nextFruit = chanceOfConsecutive == 1 ? this.currentFruit : Phaser.Math.Between(1, 5);
    }

    generateNextFruitRigged()
    {  
        this.currentFruit = this.nextFruit
        if (this.startFruitOrder > 4)
            this.nextFruit = Phaser.Math.Between(1,5)
        else
            this.nextFruit = this.startFruitArray[this.startFruitOrder]
        this.startFruitOrder++;
        
    }

    setupInput()
    {
        this.spawnPointY = 80
        this.spawnPointX = this.game.config.width / 2
        this.input.on('pointermove',(pointer)=> {
            this.spawnPointX = pointer.x;
        });
        this.input.on('pointerdown',()=>{
            this.fruitGroup.add(new Fruit(this,this.spawnPointX,this.spawnPointY, this.getFruitConfig('fruit' + this.currentFruit)))

            if (this.startFruitOrder > 5)
                this.generateNextFruitRandom();
            else
                this.generateNextFruitRigged();
            this.fruit.destroy();
            let offset = this.offsetFromBorders.get('fruit' + this.currentFruit)
            this.fruit = this.add.image(this.spawnPointX + offset < this.game.config.width ? (this.spawnPointX - offset > 0 ? this.spawnPointX : offset) : this.game.config.width - offset,
                this.spawnPointY,'fruit' + this.currentFruit).setScale(this.fruitScale.get('fruit' + this.currentFruit))

        })
    }

    generateData()
    {
        this.fruitScale = new Map([
            ['fruit1', 0.112],['fruit2', 0.15],['fruit3', 0.2],
            ['fruit4', 0.25],['fruit5', 0.35],['fruit6', 0.43],
            ['fruit7', 0.5],['fruit8', 0.58],['fruit9', 0.75],
            ['fruit10', 0.8],['fruit11', 1]
        ])
        this.radius = new Map([
            ['fruit1', 110],['fruit2', 135],['fruit3', 135],
            ['fruit4', 125],['fruit5', 140],['fruit6', 145],
            ['fruit7', 140],['fruit8', 146],['fruit9', 125],
            ['fruit10', 141],['fruit11', 147]
        ])
        this.offsetX = new Map([
            ['fruit1', -0.02],['fruit2', 0],['fruit3', 0],
            ['fruit4', 0],['fruit5', 0],['fruit6', 0],
            ['fruit7', 0],['fruit8', -0.007],['fruit9', 0],
            ['fruit10', 0],['fruit11', 0]
        ])
        this.offsetY = new Map([
            ['fruit1', 0.11],['fruit2', 0.02],['fruit3', 0.02],
            ['fruit4', 0.05],['fruit5', 0.035],['fruit6', 0.025],
            ['fruit7', 0.027],['fruit8', -0.01],['fruit9', 0.07],
            ['fruit10', 0],['fruit11', 0]
        ])
        
        this.offsetFromBorders = new Map([
            ['fruit1', 12],['fruit2', 18],['fruit3', 25],
            ['fruit4', 30],['fruit5', 46]
        ])

        this.startFruitArray = [1,2,3,3,4]
    }

    create()
    {
        if (this.game.device.isMobile) {
            // Si es un dispositivo móvil, ajustar el zoom
            this.cameras.main.setZoom(0.5); // Ajusta el valor según tus necesidades
        }
        //bordes mapa
        this.matter.world.setBounds(0, -1, 601, 851);
        //limite
        this.add.image(0,120,'limit').setOrigin(0,0).setAlpha(0.3)

        //fruit stats
        this.fruitGroup = this.add.group({
            classType: Fruit
        })
        this.generateData()

        /*this.matter.world.add.collider(this.fruitGroup, this.fruitGroup, (fruit1, fruit2)=>{
            console.log("")
        })*/

        //input
        this.setupInput()

        //texto
        this.scoreText1 = this.add.text(47,20,'0', {fontFamily:'suikaFont', fontSize: '70px'}).setDepth(5)
        this.scoreText1.setTint(0xffb10a)
        this.scoreText2 = this.add.text(50,20,'0', {fontFamily:'suikaFont', fontSize: '70px'}).setDepth(5)
        this.scoreText2.setTint(0xffd373)

        // nube
        this.currentFruit = 1;
        this.nextFruit = 1;
        this.fruit = this.add.image(this.spawnPointX,this.spawnpointY,'fruit' + this.currentFruit).setScale(this.fruitScale.get('fruit' + this.currentFruit))
    }

    update()
    {
        if (this.spawnPointX + this.offsetFromBorders.get('fruit' + this.currentFruit) < this.game.config.width &&
            this.spawnPointX - this.offsetFromBorders.get('fruit' + this.currentFruit) > 0)
        {
            this.fruit.setPosition(this.spawnPointX, this.spawnPointY)
        }
    }
}