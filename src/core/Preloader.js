import * as PIXI from 'https://esm.sh/pixi.js@7.2.4';

// Class responsible for loading assets and displaying a loading percentage
export class Preloader {
    constructor(app, assests) {
        this.app = app;
        this.assets = assests;
        this.text = new PIXI.Text('Loading... 0%', { fill: '#fff', fontSize: 30 });
        this.text.anchor.set(0.5);
        app.stage.addChild(this.text);
        this.center(); // Center the loading text
    }

    // Re-center the text on screen
    center() {
        this.text.x = this.app.screen.width / 2;
        this.text.y = this.app.screen.height / 2;
    }
    
    // Start loading assests, return a promise when done
    load() {
        return new Promise(resolve => {
            PIXI.Assets.load(this.assets, progress => {
                this.text.text = `Loading... ${Math.round(progress * 100)}%`;
                this.center(); // Re-center the text on screen
            }).then(() => {
                this.app.stage.removeChild(this.text); // Remove loading text when done
                resolve(); // Resolve the promise when loading is complete
            });
        });
    }
}