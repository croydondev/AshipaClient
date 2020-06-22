import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { Login, LoginResponse } from '../../models/login';
import { Subscription } from 'rxjs';

import { SessionService } from '../../services/session.service';
import { Usersession } from '../../models/usernameexists';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  usersession: Usersession = new Usersession();

  error: string = "";
  accountIdError: string = "";
  displayResetPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  changePassword: boolean = false;
  resetKey: string;
  _username: string;
  _password: string;

  usernameError: boolean = false;
  passwordError: boolean = false;
  loginError: boolean = false;

  _login: Login = new Login();
  sessionid: string;
  subscription: Subscription;  

  constructor(private _router: Router, private _registrationService: RegistrationService, private sessionService: SessionService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.usersession.username = localStorage.getItem("username");
    this.usersession.sessionID = localStorage.getItem("sessionid");
    this._registrationService.isvalidsession(this.usersession).subscribe(isvalid =>
      {
        if(isvalid)
        {
          this._router.navigate(['/customer/main'])
        }
      }) 
  }

/*
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }  
*/

getUsernameErrorMessage() {
  return this.loginForm.get("username").hasError('required') ? 'You must enter username' : '';
} 
getPasswordErrorMessage() {
  return this.loginForm.get("password").hasError('required') ? 'You must enter password' : '';
}

  public customers() {
    this._router.navigate(['/customer/main'])
  }    

  public register() {
    this._router.navigate(['/customer/register'])
  }   

  onLoginFormSubmit(form: FormGroup) {
    if (form.valid) {
      const model = form.value;
      this.usernameError = false;
      this.passwordError = false;  
      this.loginError = false;  
      this._login.username = model.username;
      this._login.password = model.password;
      this._registrationService.login(this._login).subscribe(loginuser =>
      { 

        localStorage.setItem("sessionid", loginuser.response);
        localStorage.setItem("username", this._login.username)        
        //alert(this._login.username + "\n" + loginuser.response);
        //console.log(loginuser);   
             
          if(localStorage.getItem("sessionid") != "failure" && localStorage.getItem("sessionid") != "step2")
          {
            //alert(localStorage.getItem("username") + "\n" + localStorage.getItem("sessionid"));
            //this._router.navigate(['/customer/main']);
            location.href = "/customer/main";
          }
          else{
            this.loginError = true;
          }   
                 
      });  

      

/*      
      this.subscription = this.sessionService.getMessage().subscribe(message => {
        //alert("this is it: - " + message.text);
        if(message.text != "failure" && message.text != "step2")
        {
          this._router.navigate(['/customer/main']);
        }
        else{
          this.loginError = true;
        }
      });            
      
      console.log('Valid?', form.valid);  
      this.currentTenant1 = this.mapTenant(model);  
      this.tenantService.addTenant(this.currentTenant1 as Tenant).subscribe(tent => {
        //this.currentOccupants.push(JSON.parse(JSON.stringify(this.currentOccupant)));
        //alert("valid data");
        this.isReadOnly = true;
        this.displayValidation = true;
      });    
*/                
    }
    else{              
      if(this.loginForm.get("username").hasError('required'))
      {
        this.usernameError = true;
      }
      else
      {
        this.usernameError = false;
      }
      if(this.loginForm.get("password").hasError('required'))
      {
        this.passwordError = true;    
      }
      else{
        this.passwordError = false;
      }
      //alert("invalid data");
      //this.displayValidation = false;
/*      
      this.displayValidation = false;
      setTimeout(() => {
        this.displayValidation = true;
      }, 5000);  
*/          
    }
  }  
  
  
  onLogin() {
    this.error = "";
    this.accountIdError = "";
    this._username = this.loginForm.value.username;
    this._password = this.loginForm.value.password;
    if (!this.isLoginValidated(this._username, this._password)) {
      this.usernameError = false;
      this.passwordError = false;
      this._login.username = this._username;
      this._login.password = this._password;
      this._registrationService.login(this._login).subscribe();
      this.subscription = this.sessionService.getMessage().subscribe(message => {
        //alert("this is it: - " + message.text);
        if(message.text != "failure" && message.text != "step2")
        {
          this._router.navigate(['/customer/main']);
        }
        else{
          alert("looks bugus!");
          return;
        }
      });
    }
    else{
      this.usernameError = true;
      this.passwordError = true;
    }
  }

  ResetPassword(_resetPassword: boolean) {
    this.displayResetPassword = _resetPassword;
  }

  private isLoginValidated(username: string, password: string): boolean {
    let noError = false;
    if (username === null || password === null) {
      this.error = "You must enter a username/password."
      noError = true;
    } 
    return noError;
  }


  public onCheckUser() {

  }  

}