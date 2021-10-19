import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private modalService: NgbModal) { }

  user: User = new User();
  email: string;

  public fundsForm = this.formBuilder.group({
    funds: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
  }

  onSubmit(content) {
    let funds = this.fundsForm.controls['funds'].value;
    let email = this.user.email;

    let totalFunds = funds;
    this.userService.addFunds(JSON.stringify(email), totalFunds).subscribe(data => {
        console.log(JSON.stringify(data));
        this.fundsForm.controls['funds'].setValue('');
        this.open(content);
    })
  }

  open(content) {
    this.modalService.open(content);
  }



}
