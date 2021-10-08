import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../guards/authservice';
import { Constants } from '../Helper/constants';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email:['', [Validators.email, Validators.required]],
    password:['', Validators.required]
  })
  constructor(private formBuilder : FormBuilder, private userService : UserService, private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("on submit!");
    //PASS USADO PARA PRUEBAS Aa1234$
    //CORREO PRUEBAS test@gmail.com
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    this.userService.login(email, password).subscribe((data : any) => {
      console.log("data: " + data.dataSet);
      if(data.responseCode == 1){
          localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
          let user = data.dataSet as User;
          if(user.roles.indexOf("Admin") > -1){
            this.router.navigate(["/all-user-managment"]);
          } else {
            this.router.navigate(["/user-managment"]);
          }
          this.authService.login(user.roles.toString());
      }
        console.log("response", data);
    }, error => {
      console.log("error", error);
    })
  }

}