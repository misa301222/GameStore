import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Help } from '../Models/help';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private readonly baseURL: string = "https://localhost:5001/api/Help";

  constructor(private httpClient: HttpClient) { }

  getAllHelp() {
    return this.httpClient.get<Help[]>(this.baseURL);
  }

  saveHelp(question: string, answer: string) {
    let body = {
      Question: question,
      Answer: answer
    }
    return this.httpClient.post<Help>(this.baseURL, body);
  }

  deleteHelp(helpId: number) {
    return this.httpClient.delete<Help>(this.baseURL + '/' + helpId);
  }  

}
