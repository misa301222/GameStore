import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmploymentApplication } from '../Models/employmentApplication';

@Injectable({
  providedIn: 'root'
})
export class EmploymentApplicationService {

  private readonly baseURL: string = "https://localhost:5001/api/EmploymentApplication";

  constructor(private httpClient: HttpClient) { }

  saveApplication(email: string, fullName: string, phone: string, address: string, scholarship: string, employmentDesired: number, applicationDate: string, applicationStatus: number) {

    let body = {
      Email: email,
      FullName: fullName,
      Phone: phone,
      Address: address,
      Scholarship: scholarship,
      EmploymentDesired: employmentDesired,
      ApplicationDate: applicationDate,
      applicationStatus: applicationStatus
    }

    return this.httpClient.post<EmploymentApplication>(this.baseURL, body);
  }

  updateApplicationStatus(email: string, statusId: number){
    let body = {
      Email: email,
      ApplicationStatus: statusId
    }
    return this.httpClient.post<EmploymentApplication>(this.baseURL + '/UpdateApplicationStatus/', body);
  }

  getApplicationByEmploymentApplicationId(employmentApplicationId: number) {
    return this.httpClient.get<EmploymentApplication>(this.baseURL + '/' + employmentApplicationId);
  }

  getApplicationByEmail(email: String) {
    return this.httpClient.get<EmploymentApplication>(this.baseURL + '/GetEmploymentApplicationByEmail/' + email);
  }

  getApplicationByStatusId(statusId: number) {
    return this.httpClient.get<EmploymentApplication[]>(this.baseURL + '/GetAllEmploymentApplicationsByStatusId/' + statusId);
  }
}
