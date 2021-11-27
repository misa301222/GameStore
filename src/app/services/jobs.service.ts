import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobs } from '../Models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private readonly baseURL: string = "https://localhost:5001/api/Jobs";

  constructor(private httpClient: HttpClient) { }

  getAllJobs(){
    return this.httpClient.get<Jobs[]>(this.baseURL)
  }

  getJobById(jobId: number){
    return this.httpClient.get<Jobs>(this.baseURL + '/' + jobId);
  }
  
}
