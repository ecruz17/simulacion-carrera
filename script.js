const MOVES = [1,1,2,2,2,3];

class Turn {
    constructor(timesRunned) {
        this.timesRunned = timesRunned;
        this.maxRuns = timesRunned.length;
    }

    dice() {
        return Math.floor(Math.random() * (this.maxRuns - 0) + 0)
    }

    advance() {
        return this.timesRunned[this.dice()];
    }
}

let initRun = new Turn(MOVES);

class Board {
    constructor(turn, boxes) {
        this.turn = turn;
        this.registry = [0,0];

        this.registryPlayer1 = [];
        this.registryPlayer2 = [];

        this.player1 = 'Jorge';
        this.player2 = 'Patricia';

        this.boxes = boxes;
    }

    play() {
        let sameAdvance = false
        while(sameAdvance === false) {
            this.registry[0] += this.turn.advance();
            this.printAdvance(this.player1, this.registry[0]);
            this.registry[1] += this.turn.advance();
            this.printAdvance(this.player2, this.registry[1]);
            this.registryPlayer1.push(this.registry[0]);
            if(this.boxes <= this.registry[0]) {
                sameAdvance = this.checkAdvance();
            }
            this.registryPlayer2.push(this.registry[1]);
            if(this.boxes <= this.registry[1]) {
                sameAdvance = this.checkAdvance();
            }
        }
        this.win();
    }

    checkAdvance() {
        if(this.registryPlayer1.length === this.registryPlayer2.length) {
            return true;
        } else if (this.registryPlayer1.length < this.registryPlayer2.length) {
            return false;
        } else if (this.registryPlayer1.length > this.registryPlayer2.length) {
            this.registry[1] += this.turn.advance();
            return true;
        }   
        console.log(this.registry[0], this.registry[1]);
    }
    printAdvance(player, boxes) {
        console.log(`${player} va en la casilla: ${boxes}`);
    }

    win() {
        if(this.registry[0] >= 100 && this.registry[1] >= 100 ||
           this.registry[0] === this.registry[1]) {
            console.log(`Los jugadores ${this.player1} y ${this.player2} empataron!`);
        } else if (this.registry[0] > this.registry[1]) {
            console.log(`El jugador ${this.player1} ganó!`);
        } else {
            console.log(`El jugador ${this.player2} ganó!`);
        }
    }

}

let race1 = new Board(initRun, 100);
console.log(race1.play());

//console.log(initRun.advance());

// 1/6 Si cae 3 avanza: 3 cuadros
// 2/6 Si cae 1,2 avanza: 1 cuadro
// 3/6 Si cae 4,5,6 avanza: 2 cuadros