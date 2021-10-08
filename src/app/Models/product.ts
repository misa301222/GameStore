export class Product {

    productId: number;
    productName: string;
    description: string;
    category: number;
    coverUrl: string;
    price: number;

    constructor(productId?: number, productName?: string, description?: string, category?: number, coverUrl?: string, price?: number) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.category = category;
        this.coverUrl = coverUrl;
        this.price = price;
    }

}