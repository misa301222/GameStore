import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../guards/authservice';
import { Constants } from '../../Helper/constants';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOnEnterAnimation(),
  trigger('imageLoginState', [
    state('normal', style({
      //transform: 'translateX(-100%) translateY(50px)',
      transform: 'translateX(0px)',
      opacity: 1
    })),
    state('rotateAnimation', style({
      //transform: 'translateX(50%) translateY(0px)',
      transform: 'translateX(0px)',
      opacity: 1
    })),
    //transition('hide => show', animate('400ms ease-out')),
    transition('rotateAnimation => normal', animate('2000ms', keyframes([
      style({ transform: 'translateX(0) rotateY(0) rotateX(0)', offset: 0 }),
      style({ transform: 'translateX(50%) rotateY(90deg) rotateX(30deg)', offset: 0.33 }),
      style({ transform: 'translateX(-75%) rotateY(180deg) rotateX(360deg)', offset: 0.66 }),
      style({ transform: 'translateX(0%)', offset: 1 })
    ]))),
    transition('normal => rotateAnimation', animate('400ms ease-out'))
  ])
  ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showImage = false;
  buttonWasPressed = false;

  get stateName() {
    return this.showImage ? 'normal' : 'rotateAnimation';
  }

  toggle() {
    this.buttonWasPressed = true;
    console.log(this.showImage);
    return this.showImage = !this.showImage;
  }

  animationDone($event) {    
    this.showImage = false;
  }

  onSubmit() {
    //PASS USADO PARA PRUEBAS Aa1234$
    //CORREO PRUEBAS test@gmail.com
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    this.userService.login(email, password).subscribe((data: any) => {

      switch (data.responseCode) {
        case 1:
          this.toastr.success('You have been logged in!', 'Login.', {
            positionClass: 'toast-top-center'
          })
          localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
          localStorage.setItem('EMAIL', email);
          let user = data.dataSet as User;
          if (user.roles.indexOf("Admin") > -1) {
            this.router.navigate(["/home"]);
          } else {
            this.router.navigate(["/home"]);
          }
          this.authService.login(user.roles.toString());
          break;
        case 2:
          this.toastr.error('Invalid Username or Password Please check the data!', 'Login.', {
            positionClass: 'toast-top-center'
          })
          break;
      }

    }, error => {

    })
  }

}
