import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/reponseModel';
import { ReviewLike } from '../Models/reviewLike';

@Injectable({
  providedIn: 'root'
})
export class ReviewLikeService {
  private readonly baseURL: string = "https://localhost:5001/api/ReviewLike";

  constructor(private httpClient: HttpClient) { }

  verifyLike(reviewId: number, email: string){
    return this.httpClient.get<boolean>(this.baseURL + '/VerifyLike/' + email + '/' + reviewId);
  }

  saveLike(reviewId: number, email: string, likeValue: number){
    let body = {
      ReviewId: reviewId,
      Email: email,
      LikeValue: likeValue
    }
    return this.httpClient.post<ReviewLike>(this.baseURL + '/SaveLike', body)
  }

  getLikesByEmailAndReviewId(email: string, reviewId: number){
    return this.httpClient.get<ReviewLike[]>(this.baseURL + '/GetLikesByEmailAndReviewId/' + email + '/' + reviewId);
  }

  updateLike(reviewId: number, email: string, likeValue: number){
    let body = {
      ReviewId: reviewId,
      Email: email,
      LikeValue: likeValue
    }
    return this.httpClient.post<ResponseModel>(this.baseURL + '/UpdateReviewLike', body);
  }

  deleteReviewLike(reviewIdToDelete: number){
    return this.httpClient.delete<ReviewLike>(this.baseURL + '/DeleteAllReviewLikeByReviewId/' + reviewIdToDelete);
  }

}
