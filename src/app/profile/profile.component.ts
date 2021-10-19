import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Models/user';
import { UserImage } from '../Models/userImage';
import { UserImageService } from '../services/user-image.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  userImage: UserImage = new UserImage();

  constructor(private router: Router, private userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder, private userImageService: UserImageService) { }

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

  saveImage() {
    let email = this.addImageForm.controls['email'].value;
    let coverUrl = this.addImageForm.controls['coverUrl'].value;
    this.userImageService.saveImage(email, coverUrl).subscribe(data => {
      console.log(JSON.stringify(data));
      this.router.navigate(['profile']);
    })

  }

  goToHistory(){
    this.router.navigate(['history']);
  }

}
