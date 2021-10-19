export class History {
    productId: number;
    productName: string;
    price: number;
    email: string;
    buyDate: string;

    constructor(productId?: number, productName?: string, price?: number, email?: string, buyDate?: string) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.email = email;
        this.buyDate = buyDate;
    }
}