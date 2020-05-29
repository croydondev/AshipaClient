import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../services/registration.service';
import { Usersession } from '../models/usernameexists';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [NgbCarouselConfig]
})
export class LandingComponent implements OnInit {

  usersession: Usersession = new Usersession();
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private _router: Router, private modalService: NgbModal, config: NgbCarouselConfig, private _registrationService: RegistrationService) { 

    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;    

  }

  ngOnInit() {
  }
  
  public customers() {
    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");   
    this._registrationService.isvalidsession(this.usersession).subscribe((result) =>
    {
      if(result)
      {
        this._router.navigate(['/customer/main'])
      }
      else{
        this._router.navigate(['/customer/login'])
      }
    });         
  }  
  public operators() {
    //alert("seen!");
    //this._router.navigate(['/operator/login'])
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'Welcome to Ashipa!';    
  }

}
