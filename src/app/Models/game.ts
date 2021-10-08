export class Game {
    idGame: number;
    gameName: string;
    publisher: string;
    price: number;
    releaseDate: string;

    constructor(idGame?: number, gameName?: string, publisher?: string, price?: number, releaseDate?: string) {
        this.idGame = idGame;
        this.gameName = gameName;
        this.publisher = publisher;
        this.price = price;
        this.releaseDate = releaseDate;
    }
}