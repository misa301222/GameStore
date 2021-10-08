import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  public fundsForm = this.formBuilder.group({
    funds: ['', Validators.required]
  })

  ngOnInit(): void {
    
  }

  onSubmit(){
    let funds = this.fundsForm.controls['funds'].value;

    console.log('val: ' + funds);
  }

}
