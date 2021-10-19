import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  productList: Product[] = [];
  categoryName: string = "";
  filterTerm: string;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProductsByCategoryId(Number(this.route.snapshot.paramMap.get('categoryId')));
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
