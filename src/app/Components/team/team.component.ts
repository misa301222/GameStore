import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [fadeInOnEnterAnimation(),
  trigger('makeImageBigger', [
    state('normal', style({
      transform: 'translateX(0px)'
    })),
    state('big', style({
      transform: 'scale(1.1, 1.1)'
    })),
    transition('normal => big', animate('300ms ease-out')),
    transition('big => normal', animate('300ms ease-in'))
  ])
  ]
})
export class TeamComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router) { }

  active = 'top';

  isImageBig = false;

  ngOnInit(): void {
  }

  toggle() {
    this.isImageBig = true;
    return this.isImageBig;
  }

  toggleMouseLeave() {
    this.isImageBig = false;
    return this.isImageBig;
  }

  btnYes(content) {
    this.modalService.open(content);
  }

  btnNo(content) {
    this.modalService.open(content);
  }

  goToApplication() {
    this.router.navigate(['/send-application']);
    this.modalService.dismissAll();
  }

}
