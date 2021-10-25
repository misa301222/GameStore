import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInAnimation, fadeInDownAnimation, fadeInDownOnEnterAnimation, fadeInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { UserImage } from 'src/app/Models/userImage';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  userImage: UserImage = new UserImage();
  editImageButton = false;
  saveImageButton = false;

  constructor(private router: Router, private userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder,
    private userImageService: UserImageService, private toastr: ToastrService) { }

  public addImageForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    coverUrl: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((data: User) => {
      console.log(data);
      this.user = data;
      let em = this.user.email.replace(/['"]+/g, '');
      this.getUserImage(em);
    });
  }

  getUserImage(email: string) {
    this.userImageService.getUserImageByEmail(email).subscribe(data => {
      this.userImage = data;
      this.editImageButton = true;
    }, err => {
      if (err.status == 404) {
        console.log('User image not found');
        this.saveImageButton = true;
      }
    });
  }

  addFunds() {
    this.router.navigate(['funds']);
  }

  addImage(content) {
    this.modalService.open(content);
    this.addImageForm.controls['email'].setValue(this.user.email);
    this.addImageForm.controls['email'].disable();
    this.addImageForm.controls['coverUrl'].setValue(this.userImage.coverUrl);
  }

  saveImage(event: MouseEvent): void {
    let email = this.addImageForm.controls['email'].value;
    let coverUrl = this.addImageForm.controls['coverUrl'].value;
    let eventName = event.toString();
    console.log('eventName: ' + eventName);

    switch (eventName) {
      case "saveButton":
        this.userImageService.saveImage(email, coverUrl).subscribe(data => {
          console.log(JSON.stringify(data));
          this.modalService.dismissAll();
          this.toastr.success('Image saved successfully', 'Image', {
            positionClass: 'toast-top-center'
          })
          this.router.navigate(['profile']);
        })
        break;

      case 'editButton':
        this.userImageService.editImage(email, coverUrl).subscribe(data => {
          this.modalService.dismissAll();
          this.getUserImage(email);

          this.toastr.success('Image updated successfully', 'Image', {
            positionClass: 'toast-top-center'
          })

          this.router.navigate(['profile']);
        })
        break;
    }
  }

  goToHistory() {
    this.router.navigate(['history']);
  }

}
