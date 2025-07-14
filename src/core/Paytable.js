// Payouts for matching 3, 4, or 5 of each symbol
export const PAYTABLE = {
    hv1: [0, 10, 20, 50],
    hv2: [0, 5, 10, 20],
    hv3: [0, 5, 10, 15],
    hv4: [0, 5, 10, 15],
    lv1: [0, 2, 5, 10],
    lv2: [0, 1, 2, 5],
    lv3: [0, 1, 2, 3],
    lv4: [0, 1, 2, 3]
};

// List of paylines: which row to check on each reel ( 5 positions )
export const PAYLINES = [
    [0, 0, 0, 0, 0], // Top row
    [1, 1, 1, 1, 1], // Middle row
    [2, 2, 2, 2, 2], // Bottom row
    [0, 1, 2, 1, 0], // V shape
    [2, 1, 0, 1, 2],  // inverted V shape
    [0, 1, 2, 1, 0],  // Diagonal from top-left
    [2, 1, 0, 1, 2]  // Diagonal from bottom-left
];

// Check each payline for winnning combinations
export function evaluate(grid) {
    const results = [];
    PAYLINES.forEach((line, i) => {
        const symbols = line.map((row, col) => grid[row][col]);
        const base = symbols[0]; // First symbol in the line
        let count = 1;
        for (let j = 1; j < 5; j++) {
            if (symbols[j] === base) count++;
            else break;
        }
        if (count >= 3) {
                results.push({ line: i + 1, symbol: base, count, payout: PAYTABLE[base][count] });
        }
    });
    return results;
}