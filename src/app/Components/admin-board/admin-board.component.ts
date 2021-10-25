import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class AdminBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
