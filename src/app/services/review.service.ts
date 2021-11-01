import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/reponseModel';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly baseURL: string = "https://localhost:5001/api/Review";

  constructor(private httpClient: HttpClient) { }

  getReviewsByProductId(productId: number) {
    return this.httpClient.get<Review[]>(this.baseURL + '/GetReviewByProductId/' + productId);
  }

  verifyReview(email: string, productId: number){
    return this.httpClient.get<boolean>(this.baseURL + '/VerifyReview/' + email + '/' + productId);
  }

  saveReview(productId: number, email: string, title: string, description: string, stars: number, verifiedPurchase: boolean, usefulCount: number, reviewDate: string) {
    let body = {
      ProductId: productId,
      Email: email,
      Title: title,
      Description: description,
      Stars: stars,
      VerifiedPurchase: verifiedPurchase,
      UsefulCount: usefulCount,
      ReviewDate: reviewDate
    }
    return this.httpClient.post<Review>(this.baseURL + '/SaveReview/', body);
  }  

  updateUsefulCount(productId: number, email: string){
    let body = {
      ProductId: productId,
      Email: email
    }
    return this.httpClient.post<ResponseModel>(this.baseURL + '/UpdateUsefulCountReviewModel', body);
  }

  deleteReview(reviewId: number){
    return this.httpClient.delete<Review>(this.baseURL + '/DeleteReviewById/' + reviewId);
  }

}
