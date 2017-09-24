export class Dice {
    // kaç zar
    count: number;
    // kaç yüzlü zar
    face: number;
    // en yüksek kaç zar atılacak
    dropHigh: number;
    // en düşük kaç zar atılacak
    dropLow: number;

    constructor(count: number,
        face: number,
        dropHigh: number,
        dropLow: number) {
        this.count = count;
        this.dropHigh = dropHigh;
        this.dropLow = dropLow;
        this.face = face;
    }

    public rollDice(bonus: number): number {
        // Check if dropped dice count removes all dice
        if ((this.dropHigh + this.dropLow) >= this.count) {
            // TODO error handling
            console.log('Too much dice dropped.');
            return 0;
        }
        const sum: number[] = Array<number>();
        // Single die roll is a special case, it should fully avoid loops
        if (this.count === 1) {
            return this.singleRoll();
        } else {
            // Push given amount of single roll results in an array
            for (let i = 0; i < this.count; i++) {
                sum.push(this.singleRoll());
            }
            // If at least one of drops is greater than zero do the sorting
            // TODO check for number type
            if (this.dropHigh > 0 || this.dropLow > 0) {
                // Sort stat array by numeric magnitude
                sum.sort(
                    (a, b) => {
                        if (a < b) { return 1; }
                        if (a > b) { return -1; }
                        return 0;
                    }
                );
                if (this.dropLow > 0) {
                    // Perform roll drops on the sorted array
                    for (let i = this.dropLow; i > 0; i--) {
                        sum.pop();
                    }
                }
                if (this.dropHigh > 0) {
                    // Perform roll drops on the sorted array
                    for (let i = this.dropHigh; i > 0; i--) {
                        sum.shift();
                    }
                }
            }
            // sum survivors array
            return sum.reduce((a, b) => a + b, 0);
        }

    }

    private singleRoll(): number {
        return Math.floor((Math.random() * (this.face - 1)) + 1);
    }
}
