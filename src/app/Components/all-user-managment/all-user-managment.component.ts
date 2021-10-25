import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-user-managment',
  templateUrl: './all-user-managment.component.html',
  styleUrls: ['./all-user-managment.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class AllUserManagmentComponent implements OnInit {  

  constructor(private userService : UserService) { }

  public userList : User[] = [];
  filterTerm: string;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data : User[]) => {
        this.userList = data;
    });
  }

}
