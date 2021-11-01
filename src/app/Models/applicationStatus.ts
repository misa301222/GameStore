export class ApplicationStatus {
    applicationStatusId: number;
    description: string;

    constructor(applicationStatusId?: number, description?: string){
        this.applicationStatusId = applicationStatusId;
        this.description = description;
    }
}