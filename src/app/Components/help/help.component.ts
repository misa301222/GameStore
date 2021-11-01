import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { Help } from 'src/app/Models/help';
import { User } from 'src/app/Models/user';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class HelpComponent implements OnInit {

  constructor(private helpService: HelpService, private toastr: ToastrService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  helpList: Help[] = [];
  public addHelpForm = this.formBuilder.group({
    question: ['', [Validators.required]],
    answer: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getAllHelp();
  }

  getAllHelp() {
    return this.helpService.getAllHelp().subscribe(data => {
      console.log('data: ' + JSON.stringify(data))
      this.helpList = data;
    })
  }

  saveHelp() {
    let question = this.addHelpForm.controls['question'].value;
    let answer = this.addHelpForm.controls['answer'].value;

    return this.helpService.saveHelp(question, answer).subscribe(data => {
      this.toastr.success('Help Added Successfully!', 'Help.', {
        positionClass: 'toast-top-center'
      })
      this.getAllHelp();
      this.addHelpForm.controls['question'].setValue('');
      this.addHelpForm.controls['answer'].setValue('');
      this.modalService.dismissAll();
    })
  }

  openNewHelpModal(content) {
    this.modalService.open(content);
  }

  deleteHelp(helpId: number){
    return this.helpService.deleteHelp(helpId).subscribe(data => {
      console.log(JSON.stringify(data));
      this.toastr.info('Help Deleted Successfully!', 'Help.', {
        positionClass: 'toast-top-center'
      })
      this.getAllHelp();
    })
  }

  get isUserLogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY));
  }

  get isAdmin(): boolean {
    return this.user.roles.indexOf("Admin") > -1;
  }

}
