import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { EmploymentApplication } from 'src/app/Models/employmentApplication';
import { Jobs } from 'src/app/Models/jobs';
import { User } from 'src/app/Models/user';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { EmploymentApplicationService } from 'src/app/services/employment-application.service';
import { JobsService } from 'src/app/services/jobs.service';
import * as Confetti from 'canvas-confetti';

@Component({
  selector: 'app-send-application',
  templateUrl: './send-application.component.html',
  styleUrls: ['./send-application.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class SendApplicationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private jobService: JobsService, private employmentApplicationService: EmploymentApplicationService, private datePipe: DatePipe,
    private toastr: ToastrService, private applicationStatusService: ApplicationStatusService) { }

  jobList: Jobs[] = [];
  email: string;
  applicationSent = false;
  applicationInfo: EmploymentApplication = new EmploymentApplication();
  applicationStatus = 0;

  public sendApplicationForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    scholarship: ['', [Validators.required]],
    employmentDesired: ['', [Validators.required, Validators.min(1)]]
  })

  public viewApplicationForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    scholarship: ['', [Validators.required]],
    employmentDesired: ['', [Validators.required, Validators.min(1)]],
    status: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getAllJobs();
    this.getEmail();
    //this.fireConfetti();
  }

  sendApplication() {
    let email = this.sendApplicationForm.controls['email'].value;
    let fullName = this.sendApplicationForm.controls['fullName'].value;
    let phoneNumber = this.sendApplicationForm.controls['phoneNumber'].value;
    let address = this.sendApplicationForm.controls['address'].value;
    let scholarship = this.sendApplicationForm.controls['scholarship'].value;
    let employmentDesired = this.sendApplicationForm.controls['employmentDesired'].value;
    let date = new Date();
    let applicationDate = this.datePipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
    let applicationStatus = 1;

    return this.employmentApplicationService.saveApplication(email, fullName, phoneNumber, address, scholarship, employmentDesired, applicationDate, applicationStatus).subscribe(data => {
      this.toastr.success('Your application has been sent successfully, check your email in a couple of days! :)', 'Application Status', {
        positionClass: 'toast-top-center'
      })

    })


  }

  onChangeCategory($event) {
    this.sendApplicationForm.controls['employmentDesired'].setValue($event.target.options[$event.target.options.selectedIndex].value);
    console.log(this.sendApplicationForm.controls['employmentDesired'].value);
  }

  getAllJobs() {
    return this.jobService.getAllJobs().subscribe(data => {
      this.jobList = data;
    })
  }

  getJobById(jobId: number) {
    return this.jobService.getJobById(jobId).subscribe(data => {
      this.viewApplicationForm.controls['employmentDesired'].setValue(data.description);
    })
  }

  getStatusById(statusId: number) {
    return this.applicationStatusService.getStatusById(statusId).subscribe(data => {
      this.viewApplicationForm.controls['status'].setValue(data.description);
    })
  }

  getApplicationByEmail(email: String) {
    return this.employmentApplicationService.getApplicationByEmail(email).subscribe(data => {
      if (data) {
        this.applicationSent = true;
        this.viewApplicationForm.controls['email'].setValue(data.email);
        this.viewApplicationForm.controls['fullName'].setValue(data.fullName);
        this.viewApplicationForm.controls['phoneNumber'].setValue(data.phone);
        this.viewApplicationForm.controls['address'].setValue(data.address);
        this.viewApplicationForm.controls['scholarship'].setValue(data.scholarship);
        this.getJobById(data.employmentDesired);
        this.getStatusById(data.applicationStatus);
        this.viewApplicationForm.disable();
        this.applicationStatus = data.applicationStatus;
      } else {
        this.applicationSent = false;
      }
    })
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY));
  }

  getEmail() {
    if (this.user) {
      this.email = this.user.email.toString();
      this.sendApplicationForm.controls['email'].setValue(this.email);
      this.sendApplicationForm.controls['email'].disable();
      let fullName = this.user.fullName.toString();
      this.sendApplicationForm.controls['fullName'].setValue(fullName);
      this.sendApplicationForm.controls['fullName'].disable();
      this.getApplicationByEmail(this.email);
    } else {
      this.email = null;
    }
  }

  /*
  fireConfetti(){
    
    Confetti.create()({
      //shapes: ['square'],
      particleCount: 100,
      spread: 360,
      resize: true,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2
      }
    });
  }
  */

}
