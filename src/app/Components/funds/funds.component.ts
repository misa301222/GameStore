import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private modalService: NgbModal, private toastr: ToastrService, private router : Router) { }

  user: User = new User();
  email: string;
  fundsToAdd: number;

  public fundsForm = this.formBuilder.group({
    funds: ['', [Validators.required, Validators.min(1)]]
  })

  public cardForm = this.formBuilder.group({
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    ccv: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((data: User) => {
      
      this.user = data;
    });
  }

  validateFunds() {
    this.fundsToAdd = this.fundsForm.controls['funds'].value;
    if (this.fundsToAdd > 0) {
      this.toastr.info('Please insert your information', 'Credit Card Information.', {
        positionClass: 'toast-top-center'
      })
    } else {
      this.toastr.error('Please insert your information', 'Credit Card Information.', {
        positionClass: 'toast-top-center'
      })
    }
  }

  onSubmit(content) {
    let funds = this.fundsForm.controls['funds'].value;
    let email = this.user.email;

    let totalFunds = funds;
    this.userService.addFunds(JSON.stringify(email), totalFunds).subscribe(data => {
      
      this.fundsForm.controls['funds'].setValue('');
      this.open(content);
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  goToProfile(){
    this.modalService.dismissAll();
    this.router.navigate(['/profile']);
  }



}
