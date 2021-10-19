export class UserImage {
    email: string;
    coverUrl: string;

    constructor(email?: string, coverUrl?: string) {
        this.email = email;
        this.coverUrl = coverUrl;
    }
}