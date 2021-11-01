import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class TeamComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router) { }

  active = 'top';

  ngOnInit(): void {
  }

  btnYes(content) {
    this.modalService.open(content);
  }

  btnNo(content){
    this.modalService.open(content);
  }

  goToApplication(){
    this.router.navigate(['/send-application']);
    this.modalService.dismissAll();
  }

}
