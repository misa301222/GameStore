export class Jobs{
    jobId: number;
    description: string;

    constructor(jobId?: number, description?: string){
        this.jobId = jobId;
        this.description = description;
    }
}