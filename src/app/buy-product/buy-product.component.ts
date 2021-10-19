import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../Models/product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private modalService: NgbModal) { }

  selectedProduct: Product = new Product();

  ngOnInit(): void {
    this.getProductById(Number(this.route.snapshot.paramMap.get('productId')));
  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe(data => {
      console.log(JSON.stringify(data));
      this.selectedProduct = data;
    })
  }

  addToCart(selectedItem: any, content) {
    this.cartService.addToCart(selectedItem);
    this.modalService.open(content);
  }

  goToCart() {
    this.modalService.dismissAll();
    this.router.navigate(['/cart']);
  }




}
