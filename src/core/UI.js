import * as PIXI from 'https://esm.sh/pixi.js@7.2.4';

// Manages the spin button and winnings display text
export class UI {
    constructor(app, onSpin) {
        this.app = app;
        this.text = new PIXI.Text('', { fill: '#fff', fontSize: 18 });
        this.button = PIXI.Sprite.from('public/assets/spin_button.png');
        this.button.anchor.set(0.5);
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on('pointerdown', onSpin); // Bind spin function
        app.stage.addChild(this.button);
        app.stage.addChild(this.text);
    }

    // Show total winnings and detailed payline wins
    showResults(results) {
        const total = results.reduce((sum, r) => sum + r.payout, 0);
        const lines = results.map(r => `- payline ${r.line}, ${r.symbol} x${r.count}, ${r.payout}`);
        this.text.text = [`Total wins: ${total}`, ...lines].join('\n');
    }

    // Reposition button and winnings text on resize
    resize(reels) {
        this.button.x = this.app.screen.width / 2; // Center button horizontally
        this.button.y = reels.container.y + reels.symbolSize * 3 + 140; 
        this.text.x = 20; // Fixed position for text
        this.text.y = this.button.y + 50; 
        this.text.style.wordWrapWidth = this.app.screen.width - 40; // Wrap text within screen width
    }
}