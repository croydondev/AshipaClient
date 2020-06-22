import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from './services/session.service';
import { Subscription } from 'rxjs';
import { RegistrationService } from './services/registration.service';
import { Usersession } from './models/usernameexists';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  validsession: boolean = false;
  collapse: boolean = false;
  username: string;
  usersession: Usersession = new Usersession();

  constructor(private _router: Router, private sessionService: SessionService, private _registrationService: RegistrationService) {    
   }

  ngOnInit() {
    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");
    this._registrationService.isvalidsession(this.usersession).subscribe(isvalid =>
      {
        this.validsession = isvalid;
      })      
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}   

public toggle() {
  if(this.collapse)
  {
    this.collapse = false;
  }
  else{
    this.collapse = true;
  }
}
public logout() {
  this.usersession.username = localStorage.getItem("username");
  this.usersession.sessionID = localStorage.getItem("sessionid");
  this._registrationService.logout(this.usersession).subscribe(sessionstate =>
    {
      this.validsession = false;
      console.log(sessionstate);
      this._router.navigate(['/landing']);
    });
}

}
