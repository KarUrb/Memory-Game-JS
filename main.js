const memoryGame = {
    tilesNumber: 16, //liczba kafelków
    tileOnRow: 4,
    divBoard: null, //div - plansza gry
    divScore: '', //div - wynik gry
    tiles: [], //tablica z wymieszanymi kafelkami
    activeTiles: [], //tablica z wybranymi kafelkami
    moveNumber: 0, //liczba wykonanych ruchów

    tilesImg: [ //tablica z grafikami kafelków
        'img/tile_1.png',
        'img/tile_2.png',
        'img/tile_3.png',
        'img/tile_4.png',
        'img/tile_5.png',
        'img/tile_6.png',
        'img/tile_7.png',
        'img/tile_8.png',
    ],
    canClick: true, //możliwosć klikania na kafelki,
    tilePairs: 0, //liczba znalezionych par kafelków


    // Part 2 - Sprawdzenie czy kliknięte karty dają wygraną/przegraną
    tileClick: function (e) {
        if (this.canClick) {
            //jeżeli jeszcze nie pobraliśmy 1 elementu
            //lub jeżeli index tego elementu nie istnieje w pobranych...
            if (!this.activeTiles[0] || (this.activeTiles[0].dataset.index !== e.target.dataset.index)) {
                this.activeTiles.push(e.target);
                e.target.style.backgroundImage = `url(${this.tilesImg[e.target.dataset.cardType]}`;
            }

            if (this.activeTiles.length === 2) {
                this.canClick = false;

                if (this.activeTiles[0].dataset.cardType === this.activeTiles[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }

                this.moveNumber++;
                this.divScore.innerHTML = `The number of moves:${this.moveNumber}`;
            }
        }
    },
    //Part 3 - usuwanie kart, jeśli są dobrze dopasowane
    deleteTiles: function () {
        this.activeTiles[0].remove();
        this.activeTiles[1].remove();

        this.canClick = true;
        this.activeTiles = [];

        this.tilePairs++;
        if (this.tilePairs >= this.tilesNumber / 2) {
            alert(`You did it! Congratulation!`)
        }
    },
    //Part 4 - zakrywanie kart, jeśli nie są dopasowane
    resetTiles: function () {
        this.activeTiles[0].style.backgroundImage = 'url(img/tiles.jpg)';
        this.activeTiles[1].style.backgroundImage = 'url(img/tiles.jpg)';;

        this.activeTiles = [];
        this.canClick = true;

    },

    //Part 1 - rozpoczęcie gry
    startGame() {

        //czyszczenie planszy
        this.divBoard = document.querySelector('.game-board');
        this.divBoard.innerHTML = '';

        //czyszczenie wyniku
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        //reset zmiennych
        this.tiles = [];
        this.activeTiles = [];
        this.moveNumber = 0;
        this.canClick = true;
        this.tilePairs = 0;

        //generowanie tablicy z numerami kafelków - parami
        //od indeksu 0 do indesku 16 wstaw 16 kafelków [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
        for (let i = 0; i < this.tilesNumber; i++) {
            this.tiles.push(Math.floor(i / 2))
        }
        this.tiles.sort(function () {
            Math.random() - 0.5
        })

        //mieszanie wygenerowanej tablicy tiles
        for (let i = this.tilesNumber - 1; i > 0; i--) {
            const swap = Math.floor(Math.random() * i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }


        for (let i = 0; i < this.tilesNumber; i++) {
            //stworzenie diva przechowującego miejsce dla pojedynczego kafelka i dodanie go do planszy
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            this.divBoard.appendChild(tile);
            //
            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.top = 1 + 25 * (i % this.tileOnRow) + '%';
            tile.style.left = 1 + 25 * (Math.floor(i / this.tileOnRow)) + '%';

            tile.addEventListener("click", this.tileClick.bind(this));

        }
    }
}

// document.addEventListener('DOMContentLoaded', function () {
document.querySelector('.game-start').addEventListener('click', function () {
    memoryGame.startGame();
});
// });