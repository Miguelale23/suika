import Boot from "./boot.js";
import Level from './level.js'
const config = {
    type: Phaser.AUTO,
	parent: 'game',
    scale: {
        width: 600,
        height: 850,
        zoom: 1,
        autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            enableSleeping: true
        }
    },
    backgroundColor: '#f5e393',
    scene: [ Boot, Level ],
	title: "Suika",
	version: "1.0.0"
};

new Phaser.Game(config);