import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public addCategoryForm = this.formBuilder.group({
    categoryId : ['',[Validators.required]],
    categoryName : ['',[Validators.required]],
  });

  constructor(private formBuilder : FormBuilder, private categoryService : CategoryService, private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  onSubmit(content){
    let categoryId = this.addCategoryForm.controls['categoryId'].value;
    let categoryName = this.addCategoryForm.controls['categoryName'].value;

    this.categoryService.addCategory(categoryId, categoryName).subscribe(data=> {
      console.log(JSON.stringify(data));
      this.addCategoryForm.controls['categoryId'].setValue('');
      this.addCategoryForm.controls['categoryName'].setValue('');
      this.open(content);
    }) 

  }

  open(content) {
    this.modalService.open(content);
  }



}
