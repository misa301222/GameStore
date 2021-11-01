export class ReviewLike {
    id: number;
    reviewId: number;
    email: string;
    likeValue: number;

    constructor(id?: number, reviewId?: number, email?: string, likeValue?: number) {
        this.id = id;
        this.reviewId = reviewId;
        this.email = email;
        this.likeValue = likeValue;
    }
}