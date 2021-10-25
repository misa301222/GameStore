import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserImage } from '../Models/userImage';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  private readonly baseURL: string = "https://localhost:5001/api/UserImage";

  constructor(private httpClient: HttpClient) { }

  saveImage(email: string, coverUrl: string) {
    let body = {
      Email: email,
      CoverUrl: coverUrl
    }
    return this.httpClient.post<UserImage>(this.baseURL + '/AddImage', body);
  }

  editImage(email: string, coverUrl: string) {
    let body = {
      Email: email,
      CoverUrl: coverUrl
    }
    return this.httpClient.put<UserImage>(this.baseURL + '/' + email, body);
  }

  getUserImageByEmail(email: string) {
    return this.httpClient.get<UserImage>(this.baseURL + '/' + email);
  }

}
