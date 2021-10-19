export class Game {
    idGame: number;
    gameName: string;
    publisher: string;
    price: number;
    releaseDate: string;
    category: number;
    coverUrl: string;
    description: string;
    quantity: number;

    constructor(idGame?: number, gameName?: string, publisher?: string, price?: number, releaseDate?: string, category?: number, coverUrl?: string, description?: string, quantity? : number) {
        this.idGame = idGame;
        this.gameName = gameName;
        this.publisher = publisher;
        this.price = price;
        this.releaseDate = releaseDate;
        this.category = category;
        this.coverUrl = coverUrl;
        this.description = description;
        this.quantity = quantity;
    }
}