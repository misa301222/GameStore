import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationStatus } from '../Models/applicationStatus';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {

  private readonly baseURL: string = "https://localhost:5001/api/ApplicationStatus";

  constructor(private httpClient: HttpClient) { }

  getStatusById(statusId: number) {
    return this.httpClient.get<ApplicationStatus>(this.baseURL + '/' + statusId);
  }
}
