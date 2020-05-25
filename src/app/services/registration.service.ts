import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usernameexists, Usersession, UserDetailsResponse, UserDetails } from '../models/usernameexists';
import { Createuserstep1 } from '../models/createuserstep1';
import { Createuserstep2 } from '../models/createuserstep2';
import { Login, LoginResponse } from '../models/login';
import { Coreresponse, CoreRequest } from '../models/coreresponse';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private createuserstep1Url = environment.apiUrl + 'createuserstep1';
  private createuserstep2Url = environment.apiUrl + 'createuserstep2/';
  private loginUser: Login = new Login();
  private isloggedIn: boolean;


  constructor(private http: HttpClient, private sessionService: SessionService) {}

  login(occupant: Login): Observable<LoginResponse> {
    console.log(occupant);
    this.loginUser = occupant;
    return this.http.post<LoginResponse>(environment.apiUrl + 'login', occupant, httpOptions).pipe(
      tap((occup: LoginResponse) => this.log(`login w/ id=${occup}`)),
      catchError(this.setSessionID<LoginResponse>('setSessionID'))
    );
  }  

  logout(occupant: Usersession): Observable<Usersession> {
    return this.http.post<Usersession>(environment.apiUrl + 'logout/' + occupant.username, occupant, httpOptions).pipe(
      tap((occup: Usersession) => this.log(`logout w/ id=${occup}`)),
      catchError(this.handleError<Usersession>('logout'))
    );
  }  

  userDetails(occupant: Usersession): Observable<UserDetailsResponse> {
    return this.http.post<UserDetailsResponse>(environment.apiUrl + 'getuserdetail/' + occupant.username, occupant, httpOptions).pipe(
      tap((occup: UserDetailsResponse) => this.log(`getuserdetail w/ id=${occup}`)),
      catchError(this.handleError<UserDetailsResponse>('getuserdetail'))
    );
  }

  isvalidsession1(occupant: Login): Observable<any> {
    console.log(occupant);
    this.loginUser = occupant;
    return this.http.post<string>(environment.apiUrl + 'login', occupant, httpOptions).pipe(
      catchError(this.setSessionID<any>('setSessionID'))
    );
  } 
  
  isvalidsession(occupant: Usersession): Observable<boolean> {
    return this.http.post<Usersession>(environment.apiUrl + 'isvalidsession', occupant, httpOptions).pipe(
      tap((occup: any) => this.log(`isvalidsession w/ id=${occup}`)),
      catchError(this.handleError<Usersession>('isvalidsession'))
    );
  }  

  checkUser(occupant: Usernameexists): Observable<Usernameexists> {
    return this.http.post<Usernameexists>(environment.apiUrl + 'usernameexists', occupant, httpOptions).pipe(
      tap((occup: Usernameexists) => this.log(`usernameexists w/ id=${occup}`)),
      catchError(this.handleError<Usernameexists>('usernameexists'))
    );
  }
  registerUserStep1(occupant: Createuserstep1): Observable<Createuserstep1> {
    return this.http.post<Createuserstep1>(environment.apiUrl + 'createuserstep1', occupant, httpOptions).pipe(
      tap((occup: Createuserstep1) => this.log(`createuserstep1 w/ id=${occup}`)),
      catchError(this.handleError<Createuserstep1>('createuserstep1'))
    );
  }  
  registerUserStep2(username: string, occupant: Createuserstep2): Observable<Createuserstep2> {
    return this.http.post<Createuserstep2>(environment.apiUrl + 'createuserstep2/' + username, occupant, httpOptions).pipe(
      tap((occup: Createuserstep2) => this.log(`createuserstep2 w/ id=${occup}`)),
      catchError(this.handleError<Createuserstep2>('createuserstep2'))
    );
  }   
  gethourlydata(corerequest: CoreRequest): Observable<Coreresponse> {
    return this.http.post<Coreresponse>(environment.apiUrl + 'gethourlydata/' + corerequest.username, corerequest, httpOptions).pipe(
      tap((occup: Coreresponse) => this.log(`gethourlydata w/ id=${occup}`)),
      catchError(this.handleError<Coreresponse>('gethourlydata'))
    );
  }   
  getdailydata(corerequest: CoreRequest): Observable<Coreresponse> {
    return this.http.post<Coreresponse>(environment.apiUrl + 'getdailydata/' + corerequest.username, corerequest, httpOptions).pipe(
      tap((occup: Coreresponse) => this.log(`getdailydata w/ id=${occup}`)),
      catchError(this.handleError<Coreresponse>('getdailydata'))
    );
  }  
  getweeklydata(corerequest: CoreRequest): Observable<Coreresponse> {
    return this.http.post<Coreresponse>(environment.apiUrl + 'getweeklydata/' + corerequest.username, corerequest, httpOptions).pipe(
      tap((occup: Coreresponse) => this.log(`getweeklydata w/ id=${occup}`)),
      catchError(this.handleError<Coreresponse>('getweeklydata'))
    );
  }    
  getmonthlydata(corerequest: CoreRequest): Observable<Coreresponse> {
    return this.http.post<Coreresponse>(environment.apiUrl + 'getmonthlydata/' + corerequest.username, corerequest, httpOptions).pipe(
      tap((occup: Coreresponse) => this.log(`getmonthlydata w/ id=${occup}`)),
      catchError(this.handleError<Coreresponse>('getmonthlydata'))
    );
  }  
  getyearlydata(corerequest: CoreRequest): Observable<Coreresponse> {
    return this.http.post<Coreresponse>(environment.apiUrl + 'getyearlydata/' + corerequest.username, corerequest, httpOptions).pipe(
      tap((occup: Coreresponse) => this.log(`getyearlydata w/ id=${occup}`)),
      catchError(this.handleError<Coreresponse>('getyearlydata'))
    );
  }      
  private handleError<T>(operation = 'operation', result?: T) {
    
    return (error: any): Observable<T> => {
      console.log(error.error.text);
      // TODO: send the error to remote logging infrastructure
      console.error(error.error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private setSessionID<T>(operation = 'operation', result?: T) {
    
    return (error: any): Observable<T> => {
      console.log(error.error.text);
      localStorage.setItem("sessionid", error.error.text);
      localStorage.setItem("username", this.loginUser.username);
      /*
      this.sessionService.sendMessage(error.error.text, this.loginUser.username);
      if(error.error.text != "failure" && error.error.text != "step2")
      {
        
      }
      else{
        
      }
      */
      //this.sessionService.sendMessage(error.error.text, this.loginUser.username);
      // TODO: send the error to remote logging infrastructure
      console.error(error.error.text + "-" + this.loginUser.username); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  

  private log(message: string) {
    console.log(message);
    // alert(message);
  }  

}
