import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Models/role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class RegisterComponent implements OnInit {

  public roles: Role[] = [];
  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit() {
    //PASS USADO PARA PRUEBAS A1234$
    let fullName = this.registerForm.controls["fullName"].value;
    let email = this.registerForm.controls["email"].value;
    let password = this.registerForm.controls["password"].value;
    let funds = 0;
    this.userService.register(fullName, email, password, this.roles.filter(x => x.isSelected).map(x => x.role), funds).subscribe((data: any) => {
      switch (data.responseCode) {
        case 1:
          this.registerForm.controls["fullName"].setValue("");
          this.registerForm.controls["email"].setValue("");
          this.registerForm.controls["password"].setValue("");
          this.roles.forEach(x => x.isSelected = false);
          this.toastr.success('User has been register Successfully! Please login.', 'Register', {
            positionClass: 'toast-top-center'
          })
          break;
        case 2:
          this.toastr.error(data.dataSet, 'Register', {
            positionClass: 'toast-top-center'
          })
          break;
      }
    }, error => {
      
    })
  }

  getAllRoles() {
    this.userService.getAllRole().subscribe(roles => {
      this.roles = roles;
    })
  }

  onRoleChange(role: string) {
    this.roles.forEach(x => {
      if (x.role == role) {
        x.isSelected = !x.isSelected;
      }
    })
  }

  isRoleSelected() {
    return this.roles.filter(x => x.isSelected).length > 0;
  }

}
