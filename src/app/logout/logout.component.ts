import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { Usersession } from '../models/usernameexists';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  validsession: boolean = false;

  usersession: Usersession = new Usersession();  

  constructor(private _registrationService: RegistrationService) { }

  ngOnInit() {
    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");
    this._registrationService.logout(this.usersession).subscribe(sessionstate =>
      {
        this.validsession = false;
        console.log(sessionstate);
        //this._router.navigate(['/landing']);
        window.location.href = "https://ashipaelectric.com/";
      });    
  }

}
