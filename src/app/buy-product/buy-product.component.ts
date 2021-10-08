import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {
  
  constructor(private router:Router, private productService : ProductService, private route : ActivatedRoute) { }

  selectedProduct : Product = new Product();

  ngOnInit(): void {
    this.getProductById(Number(this.route.snapshot.paramMap.get('productId')));
  }

  getProductById(productId : number){
    this.productService.getProductById(productId).subscribe(data =>{
      console.log(JSON.stringify(data));
      this.selectedProduct = data;
    })
  }

}
