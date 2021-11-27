import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { History } from '../Models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly baseURL: string = "https://localhost:5001/api/History";

  constructor(private httpClient: HttpClient) { }

  getAllProduct() {
    return this.httpClient.get<History[]>(this.baseURL + '/');
  }

  saveProduct(productId: number, productName: string, price: number, email: string, buyDate: string) {

    let body = {
      ProductId: productId,
      ProductName: productName,
      Price: price,
      Email: email,
      BuyDate: buyDate
    }
    return this.httpClient.post<History>(this.baseURL + '/AddHistory', body)
  }

  getAllProductByEmail(email: string) {
    return this.httpClient.get<History[]>(this.baseURL + '/GetByEmail/' + email).pipe(map((res: any) => {
      let historyList;
      if (res.responseCode == 1) {
        if (res.dataSet) {
          historyList = res.dataSet;
        }
      }
      return historyList;
    }))
  }

  verifyPurchase(email: string, productId: number){
    return this.httpClient.get<boolean>(this.baseURL + '/VerifyPurchase/' + email + '/' + productId);
  }

}
