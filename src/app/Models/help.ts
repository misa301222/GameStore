export class Help {
    helpId: number;
    question: string;
    answer: string;

    constructor(helpId?: number, question?: string, answer?: string) {
        this.helpId = helpId;
        this.question = question;
        this.answer = answer;
    }
}