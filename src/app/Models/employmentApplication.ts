export class EmploymentApplication {
    employmentApplicationId: number;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    scholarship: string;
    employmentDesired: number;
    applicationDate: string;
    applicationStatus: number;

    constructor(employmentApplicationId?: number, email?: string, fullName?: string, scholarship?: string, employmentDesired?: number, applicationDate?: string, applicationStatus?: number) {
        this.employmentApplicationId = employmentApplicationId;
        this.email = email;
        this.fullName = fullName;
        this.scholarship = scholarship;
        this.employmentDesired = employmentDesired;
        this.applicationDate = applicationDate;
        this.applicationStatus = applicationStatus;
    }
}