import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Subscription, Observable } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { Usersession } from '../models/usernameexists';


@Injectable({
  providedIn: 'root'
})
export class UrlGuardService implements CanActivate {
  path;
  route;
  usersession: Usersession = new Usersession();
  constructor(private sessionService: SessionService, private _registrationService: RegistrationService) { 
    
  }

  canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   
      return this.getUser();
  } 
  

  getUser(): Observable<boolean> {
      
    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");
    return this._registrationService.isvalidsession(this.usersession).pipe((result) =>
      {
        return result;
      }); 
  }  
  

}
