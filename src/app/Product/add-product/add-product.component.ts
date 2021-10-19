import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories: Category[] = [];

  public addProductForm = this.formBuilder.group({
    productId: ['', [Validators.required]],
    productName: ['', [Validators.required]],
    description: [''],
    cover: ['', [Validators.required]],
    category: [''],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]]
  });

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    return this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onChangeCategory($event){
    this.addProductForm.controls['category'].setValue($event.target.options[$event.target.options.selectedIndex].value);
  }


  onSubmit(content) {
    console.log('on submit!');
    let productId = this.addProductForm.controls['productId'].value;
    let productName = this.addProductForm.controls['productName'].value;
    let description = this.addProductForm.controls['description'].value;
    let cover = this.addProductForm.controls['cover'].value;
    let category = this.addProductForm.controls['category'].value;
    let price = this.addProductForm.controls['price'].value;
    let quantity = this.addProductForm.controls['quantity'].value;

    this.productService.addProduct(productId, productName, description, cover, category, price, quantity).subscribe(data=> {
      console.log(JSON.stringify(data));
      this.addProductForm.controls['productId'].setValue('');
      this.addProductForm.controls['productName'].setValue('');
      this.addProductForm.controls['description'].setValue('');
      this.addProductForm.controls['cover'].setValue('');
      this.addProductForm.controls['category'].setValue('');
      this.addProductForm.controls['price'].setValue('');
      this.addProductForm.controls['quantity'].setValue('');
      this.open(content);
    })    

  }


  open(content) {
    this.modalService.open(content);
  }

}
