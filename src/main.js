import * as PIXI from 'https://esm.sh/pixi.js@7.2.4';
import { Preloader } from './core/Preloader.js';
import { SlotMachine } from './core/SlotMachine.js';

// Create a PIXI Application that resizes with the window
const app = new PIXI.Application({ resizeTo: window, background: "#222" });
document.body.appendChild(app.view); // Append the canvas to the document body

// Define list of assets to preload ( button + symbol images )
const assets = [
    'public/assets/spin_button.png',
    ...['hv1_symbol.png', 'hv2_symbol.png', 'hv3_symbol.png', 'hv4_symbol.png',
        'lv1_symbol.png', 'lv2_symbol.png', 'lv3_symbol.png', 'lv4_symbol.png'
       ].map(symbol => `public/assets/symbols/${symbol}`)
];

// Load all the assets to start the game
const loader = new Preloader(app, assets);
loader.load().then(() => {
    new SlotMachine(app);
})

