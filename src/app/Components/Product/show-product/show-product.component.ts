import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
  animations: [
    
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
    console.log(this.idToDelete);
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

    console.log(idProduct);
    console.log(productName);
    console.log(description);
    console.log(cover);
    console.log(category);
    console.log(price);

    this.productService.editProduct(idProduct, productName, description, cover, category, price, quantity).subscribe(data => {
      console.log(data);
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
      console.log(data);
      this.modalService.dismissAll();
      this.getAllProducts();
    });

  }

  generateReport() {
    this.productService.generateReport().subscribe(data => {
      console.log('OK!');
      console.log(data);
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }


}
