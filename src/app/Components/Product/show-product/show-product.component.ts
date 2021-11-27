import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class ShowProductComponent implements OnInit {

  idToDelete: number;
  filterTerm: string;

  public editProductForm = this.formBuilder.group({
    productId: ['', [Validators.required]],
    productName: ['', [Validators.required]],
    description: [''],
    cover: ['', [Validators.required]],
    category: [''],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]]
  });

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private modalService: NgbModal, private categoryService: CategoryService) { }
  products: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onChangeCategory($event) {
    this.editProductForm.controls['category'].setValue($event.target.options[$event.target.options.selectedIndex].value);
  }

  openModalEdit(content, product: Product) {
    this.modalService.open(content);
    this.getAllCategories();
    this.editProductForm.controls['productId'].setValue(product.productId);
    this.editProductForm.controls['productId'].disable()
    this.editProductForm.controls['productName'].setValue(product.productName);
    this.editProductForm.controls['description'].setValue(product.description);
    this.editProductForm.controls['cover'].setValue(product.coverUrl);
    this.editProductForm.controls['category'].setValue(product.category);
    this.editProductForm.controls['price'].setValue(product.price);
    this.editProductForm.controls['quantity'].setValue(product.quantity);
  }

  openModalDelete(contentDelete, productId: number) {
    this.idToDelete = productId;
    
    this.modalService.open(contentDelete);
  }

  editProduct() {
    let idProduct = this.editProductForm.controls['productId'].value;
    let productName = this.editProductForm.controls['productName'].value;
    let description = this.editProductForm.controls['description'].value;
    let cover = this.editProductForm.controls['cover'].value;
    let category = this.editProductForm.controls['category'].value;
    let price = this.editProductForm.controls['price'].value;
    let quantity = this.editProductForm.controls['quantity'].value;

    
    
    
    
    
    

    this.productService.editProduct(idProduct, productName, description, cover, category, price, quantity).subscribe(data => {
      
      this.editProductForm.controls['productId'].setValue('');
      this.editProductForm.controls['productName'].setValue('');
      this.editProductForm.controls['description'].setValue('');
      this.editProductForm.controls['cover'].setValue('');
      this.editProductForm.controls['category'].setValue('');
      this.editProductForm.controls['price'].setValue('');
      this.modalService.dismissAll();
      this.getAllProducts();
    });

  }


  deleteProduct(productId: number) {
    this.productService.deleteGame(productId).subscribe(data => {
      
      this.modalService.dismissAll();
      this.getAllProducts();
    });

  }

  generateReport() {
    this.productService.generateReport().subscribe(data => {
      
      
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }


}
