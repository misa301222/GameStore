import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/guards/authservice';
import { History } from 'src/app/Models/history';
import { HistoryService } from 'src/app/services/history.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class HistoryComponent implements OnInit {
  historyList: History[] = [];
  isAdmin: boolean = false;
  filterTerm: string;
  totalGains: number;
  totalSpendings: number;

  constructor(private historyService: HistoryService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.historyService.getAllProduct().subscribe(data => {
        this.historyList = data;
        this.isAdmin = true;
        this.totalGains = this.historyList.reduce((acumulator, current) => acumulator + current.price, 0);
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
      this.totalSpendings = this.historyList.reduce((acumulator, current) => acumulator + current.price, 0);
    })
  }


}
