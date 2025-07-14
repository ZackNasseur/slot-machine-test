import { Reels } from './Reels.js';
import { UI } from './UI.js';
import { evaluate } from './Paytable.js';

//Main game controller: connects reels, UI, and game logic
export class SlotMachine {
    constructor(app) {
        this.app = app;
        this.reels = new Reels(app); // Visual symbol columns
        this.ui = new UI(app, () => this.spin()); // button + text
        this.resize(); // Initial layout
        window.addEventListener('resize', () => this.resize()); // Handle window resizing
    }

    // Handle spin logic: pick random symbols and check for wins
    spin() {
        this.reels.randomize();
        const grid = this.reels.getVisibleSymbols();
        const results = evaluate(grid);
        this.ui.showResults(results); // Display results on UI
    }

    // Adjust layout of reels and UI based on screen size
    resize() {
        this.reels.resize();
        this.ui.resize(this.reels);
    }
}

