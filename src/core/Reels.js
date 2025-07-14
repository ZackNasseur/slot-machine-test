import * as PIXI from 'https://esm.sh/pixi.js@7.2.4';

const { DropShadowFilter } = PIXI.filters;

// Define symbol band positions for each reel
const BANDS = [
  ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
  ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
  ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
  ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
  ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
];

// Handles symbol generation, rendering and band logic
export class Reels {
    constructor(app) {
        this.app = app;
        this.positions = [0, 0, 0, 0, 0]; // Initial band positions 
        this.container = new PIXI.Container();
        app.stage.addChild(this.container);
        this.symbolSize = 100; // Size of each symbol
    }

    // Generate random positions for each reel
    randomize() {
        this.positions = BANDS.map(b => Math.floor(Math.random() * b.length));
        this.render();
    }

    // Draw visible symbols on screen based on current positions
    render() {
        this.container.removeChildren(); 
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
                const band = BANDS[col];
                const index = (this.positions[col] + row) % band.length;
                const id = band[index];
                const sprite = PIXI.Sprite.from(`public/assets/symbols/${id}_symbol.png`); // Load symbol image
                sprite.width = sprite.height = this.symbolSize; // Set size
                sprite.x = col * this.symbolSize; // Position horizontally
                sprite.y = row * this.symbolSize; // Position vertically
                this.container.addChild(sprite); // Add to container
            }
        }
    }

    // Return the 3x5 symbol grid visible to the player
    getVisibleSymbols() {
        return Array.from({ length: 3 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => {
                const band = BANDS[col];
                const index = (this.positions[col] + row) % band.length;
                return band[index];
            })
        );
    }

    // Position the container in the center of the screen
    resize() {
        this.container.x = (this.app.screen.width - 5 * this.symbolSize) / 2; 
        this.container.y = (this.app.screen.height - 3 * this.symbolSize) / 2; 
    }
}