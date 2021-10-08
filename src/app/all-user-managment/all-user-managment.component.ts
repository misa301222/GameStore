import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-user-managment',
  templateUrl: './all-user-managment.component.html',
  styleUrls: ['./all-user-managment.component.scss']
})
export class AllUserManagmentComponent implements OnInit {

  public userList : User[] = [];
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data : User[]) => {
        this.userList = data;
    });
  }

}
