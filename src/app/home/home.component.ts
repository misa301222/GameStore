import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService, private router : Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  selectProduct(idProduct : number){
    this.router.navigate(['/Product/buy-product/', idProduct]);
  }


}
