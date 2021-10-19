import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/authservice';
import { History } from '../Models/history';
import { HistoryService } from '../services/history.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyList: History[] = [];
  isAdmin : boolean = false;

  constructor(private historyService: HistoryService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.historyService.getAllProduct().subscribe(data => {
        this.historyList = data;
      this.isAdmin = true;
      });
    } else {
      let email = this.userService.getEmail();
      this.getAllByEmail(email);
    }
  }

  getAllHistory() {
    return this.historyService.getAllProduct().subscribe(data => {
      this.historyList = data;
    })
  }

  getAllByEmail(email: string) {

    return this.historyService.getAllProductByEmail(email).subscribe(data => {
      console.log(data);
      this.historyList = data;
    })
  }


}
