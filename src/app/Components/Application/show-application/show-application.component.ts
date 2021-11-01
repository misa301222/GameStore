import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { EmploymentApplication } from 'src/app/Models/employmentApplication';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { EmploymentApplicationService } from 'src/app/services/employment-application.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-show-application',
  templateUrl: './show-application.component.html',
  styleUrls: ['./show-application.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class ShowApplicationComponent implements OnInit {

  constructor(private employmentApplicationService: EmploymentApplicationService, private formBuilder: FormBuilder, private modalService: NgbModal, private jobService: JobsService,
    private applicationStatusService: ApplicationStatusService, private toastr: ToastrService) { }

  applicationsPendingList: EmploymentApplication[] = [];
  applicationsAcceptedList: EmploymentApplication[] = [];
  applicationsRejectedList: EmploymentApplication[] = [];
  statusId = 0;
  filterTermPending: string;
  filterTermAccepted: string;
  filterTermRejected: string;


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
    this.getAllEmploymentApplicationsByStatusId(1);
    this.getAllEmploymentApplicationsByStatusId(2);
    this.getAllEmploymentApplicationsByStatusId(3);
  }

  getAllEmploymentApplicationsByStatusId(statusId: number) {
    switch (statusId) {
      case 1:
        this.employmentApplicationService.getApplicationByStatusId(statusId).subscribe(data => {
          this.applicationsPendingList = data;
        })
        break;

      case 2:
        this.employmentApplicationService.getApplicationByStatusId(statusId).subscribe(data => {
          this.applicationsAcceptedList = data;
        })
        break;

      case 3:
        this.employmentApplicationService.getApplicationByStatusId(statusId).subscribe(data => {
          this.applicationsRejectedList = data;
        })
        break;
    }
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

  viewApplication(employmentApplicationId: number, content) {
    console.log(employmentApplicationId);
    this.modalService.open(content);
    return this.employmentApplicationService.getApplicationByEmploymentApplicationId(employmentApplicationId).subscribe(data => {
      this.viewApplicationForm.controls['email'].setValue(data.email);
      this.viewApplicationForm.controls['fullName'].setValue(data.fullName);
      this.viewApplicationForm.controls['phoneNumber'].setValue(data.phone);
      this.viewApplicationForm.controls['address'].setValue(data.address);
      this.viewApplicationForm.controls['scholarship'].setValue(data.scholarship);
      this.getJobById(data.employmentDesired);
      this.getStatusById(data.applicationStatus);
      this.viewApplicationForm.disable();
      this.statusId = data.applicationStatus;
      console.log('status: ' + this.statusId);
    })
  }

  evaluateApplication(event: MouseEvent) {
    let btnResult = event.toString();
    let email = this.viewApplicationForm.controls['email'].value;
    console.log(email);
    switch (btnResult) {
      case 'btnAccept':
        this.employmentApplicationService.updateApplicationStatus(email, 2).subscribe(data => {
          this.toastr.success('Application Accepted!!', 'Application', {
            positionClass: 'toast-top-center'
          })
          this.modalService.dismissAll();
          console.log(data);
          this.getAllEmploymentApplicationsByStatusId(1);
          this.getAllEmploymentApplicationsByStatusId(2);
          this.getAllEmploymentApplicationsByStatusId(3);
        })
        break;

      case 'btnReject':
        this.employmentApplicationService.updateApplicationStatus(email, 3).subscribe(data => {
          this.toastr.info('Application Rejected!!', 'Application', {
            positionClass: 'toast-top-center'
          })
          this.modalService.dismissAll();
          console.log(data);
          this.getAllEmploymentApplicationsByStatusId(1);
          this.getAllEmploymentApplicationsByStatusId(2);
          this.getAllEmploymentApplicationsByStatusId(3);
        })
        break;

      case 'btnPending':
        this.employmentApplicationService.updateApplicationStatus(email, 1).subscribe(data => {
          this.toastr.info('Application Sent to Pending', 'Application', {
            positionClass: 'toast-top-center'
          })
          this.modalService.dismissAll();
          console.log(data);
          this.getAllEmploymentApplicationsByStatusId(1);
          this.getAllEmploymentApplicationsByStatusId(2);
          this.getAllEmploymentApplicationsByStatusId(3);
        })
        break;
    }
  }
}
