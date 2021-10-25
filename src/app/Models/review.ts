export class Review {
    id: number;
    productId: number;
    email: string;
    title: string;
    description: string;
    stars: number;
    verifiedPurchase: boolean;
    usefulCount: number;
    reviewDate: string;


    constructor(id?: number, productId?: number, email?: string, title?: string, description?: string, stars?: number, verifiedPurchase?: boolean, usefulCount?: number, reviewDate?: string) {
        this.id = id;
        this.productId = productId;
        this.email = email;
        this.title = title;
        this.description = description;
        this.stars = stars;
        this.verifiedPurchase = verifiedPurchase;
        this.usefulCount = usefulCount;
        this.reviewDate = reviewDate;
    }
}