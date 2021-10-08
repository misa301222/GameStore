import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseURL: string = "https://localhost:5001/api/Category";

  constructor(private httpClient: HttpClient) { }

  getAllCategories() {
    return this.httpClient.get<Category[]>(this.baseURL + '/GetAllCategories');
  }

  addCategory(categoryId: number, categoryName: string) {
    const body = {
      CategoryId: categoryId,
      CategoryName: categoryName
    }

    return this.httpClient.post<Category>(this.baseURL + '/AddCategory', body);
  }

  editCategory(categoryId: number, categoryName: string) {
    const body = {
      CategoryId: categoryId,
      CategoryName: categoryName
    }

    return this.httpClient.put<Category>(this.baseURL + '/', body);
  }

  deleteCategory(cateogryId : number){
    return this.httpClient.delete<Category>(this.baseURL + '/' + cateogryId);
  }




}

