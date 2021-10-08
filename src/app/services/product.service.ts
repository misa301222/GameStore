import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseURL: string = "https://localhost:5001/api/Product";

  constructor(private httpClient: HttpClient) { }


  getAllProduct() {
    return this.httpClient.get<Product[]>(this.baseURL + '/GetAllProducts');
  }

  addProduct(productId: number, productName: string, description: string, cover: string, category: number, price: number) {
    const body = {
      ProductId: productId,
      ProductName: productName,
      Description: description,
      CoverUrl: cover,
      Category: category,
      Price: price
    }
    return this.httpClient.post<Product>(this.baseURL + '/AddProduct', body);
  }

  editProduct(productId: number, productName: string, description: string, cover: string, category: number, price: number) {
    const body = {
      ProductId: productId,
      ProductName: productName,
      Description: description,
      Category: category,
      CoverUrl: cover,      
      Price: price
    }
    return this.httpClient.put<Product>(this.baseURL + '/' + productId, body);
  }

  deleteGame(productId : number){
    return this.httpClient.delete<Product>(this.baseURL + '/' + productId);
  }

  getProductById(productId : number){
    return this.httpClient.get<Product>(this.baseURL + '/' + productId);
  }


}
