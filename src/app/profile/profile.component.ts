import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : User = new User();

  constructor(private router:Router, private userService : UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getCurrentUser().subscribe((data : User) => {
      console.log(data);
      this.user = data;
    });
  }

  addFunds(){
    this.router.navigate(['funds']);
  }

}
