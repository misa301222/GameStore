import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    trigger('makeCardBigger', [
      state('normal', style({
        transform: 'translateX(0px)'
      })),
      state('big', style({
        transform: 'scale(1.1, 1.1)'
      })),
      transition('normal => big', animate('250ms ease-out')),
      transition('big => normal', animate('250ms ease-in'))
    ])
  ]
})
export class CatalogComponent implements OnInit {

  productList: Product[] = [];
  categoryName: string = "";
  filterTerm: string;
  isImageBig: boolean[] = [false];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProductsByCategoryId(Number(this.route.snapshot.paramMap.get('categoryId')));
  }

  toggle(i: number) {
    this.isImageBig[i] = true;
    return this.isImageBig;
  }

  toggleMouseLeave(i: number) {
    this.isImageBig[i] = false;
    return this.isImageBig;
  }

  getAllProductsByCategoryId(categoryId: number) {
    return this.productService.getAllProductsByCategoryId(categoryId).subscribe(data => {
      this.productList = data;
    })
  }

  selectProduct(idProduct: number) {
    this.router.navigate(['/Product/buy-product/', idProduct]);
  }

}
