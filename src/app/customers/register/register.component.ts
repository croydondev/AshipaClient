import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { Usernameexists } from '../../models/usernameexists';
import { Createuserstep1 } from '../../models/createuserstep1';
import { Createuserstep2 } from '../../models/createuserstep2';
import { Login, LoginResponse } from '../../models/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  error: string = "";
  accountIdError: string = "";
  displayResetPassword: boolean = false;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    companycode: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    country: new FormControl()
  });
  changePassword: boolean = false;
  resetKey: string;
  _usernameexists: Usernameexists = new Usernameexists();
  _createuserstep1: Createuserstep1 = new Createuserstep1();
  _createuserstep2: Createuserstep2 = new Createuserstep2();
  _login: Login = new Login();

  usernameError: boolean = false;
  passwordError: boolean = false;
  confirmPasswordError: boolean = false;
  companycodeError: boolean = false;

  firstnameError: boolean = false;
  lastnameError: boolean = false;
  emailError: boolean = false;
  phoneError: boolean = false;
  addressError: boolean = false;
  cityError: boolean = false;
  stateError: boolean = false;
  countryError: boolean = false;    

  regPhase: number = 0;

  registerFormStep1: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
    companycode: new FormControl('', [Validators.required])    
  });
  registerFormStep2: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });  

  constructor(private _router: Router, private _registrationService: RegistrationService ) { }

  ngOnInit() {
    this.regPhase = 1;
  }

  public signin()
  {
    this._router.navigate(['customer/login']);
  }

  public checkusername()
  {
    alert("check!");
  }

  onRegisterFormSubmitStep1(form: FormGroup) {
    if (form.valid) {
      const model = form.value;       
      if(model.confirmpassword != model.password)
      {
        this.confirmPasswordError = true;
      }
      else{
        this.confirmPasswordError = false;
        //this.regPhase = 2;
        this._usernameexists.username = model.username;
        this._registrationService.checkUser(this._usernameexists).subscribe(s => {
          if(s)
          {
            this.usernameError = true;
          }
          else{
            //alert("new user");
            this._createuserstep1.username = model.username;
            this._createuserstep1.password = model.password;
            this._createuserstep1.companycode = model.companycode;
            this._registrationService.registerUserStep1(this._createuserstep1).subscribe(s => {
              this.regPhase = 2;
            });
          }
        });        
      }      
    }
    else{
      if(this.registerFormStep1.get("username").hasError('required'))
      {
        this.usernameError = true;
      }
      else
      {
        this.usernameError = false;
      }
      if(this.registerFormStep1.get("password").hasError('required'))
      {
        this.passwordError = true;    
      }
      else{
        this.passwordError = false;
      } 
      if(this.registerFormStep1.get("confirmpassword").hasError('required'))
      {
        this.confirmPasswordError = true;    
      }
      else{
        this.confirmPasswordError = false;
      }       
      if(this.registerFormStep1.get("companycode").hasError('required'))
      {
        this.companycodeError = true;    
      }
      else{
        this.companycodeError = false;
      }             

    }    
  }  

  onRegisterFormSubmitStep2(form: FormGroup) {
    if (form.valid) {
      const model = form.value;
      this.firstnameError = false;
      this.lastnameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.addressError = false;
      this.cityError = false; 
      this.stateError = false;
      this.countryError = false; 
      this._createuserstep2.email = model.email;
      this._createuserstep2.firstname = model.firstname;
      this._createuserstep2.lastname = model.lastname;
      this._createuserstep2.phone = model.phone;
      this._createuserstep2.street = model.address;
      this._createuserstep2.city = model.city;
      this._createuserstep2.state = model.state;
      this._createuserstep2.country = model.country;

      this._registrationService.registerUserStep2(this._createuserstep1.username, this._createuserstep2).subscribe(s => {
        this._login.username = this._createuserstep1.username;
        this._login.password = this._createuserstep1.password;
        this._registrationService.login(this._login).subscribe(s => {
          localStorage.setItem("sessionid", s.response);
          localStorage.setItem("username", this._login.username)         
               
            if(localStorage.getItem("sessionid") != "failure" && localStorage.getItem("sessionid") != "step2")
            {
              location.href = "/customer/main";
            }          
        });
      });
    }
    else{
      if(this.registerFormStep2.get("email").hasError('required'))
      {
        this.emailError = true;
      }
      else
      {
        this.emailError = false;
      }
      if(this.registerFormStep2.get("firstname").hasError('required'))
      {
        this.firstnameError = true;    
      }
      else{
        this.firstnameError = false;
      } 
      if(this.registerFormStep2.get("lastname").hasError('required'))
      {
        this.lastnameError = true;    
      }
      else{
        this.lastnameError = false;
      } 
      if(this.registerFormStep2.get("phone").hasError('required'))
      {
        this.phoneError = true;    
      }
      else{
        this.phoneError = false;
      }
      if(this.registerFormStep2.get("address").hasError('required'))
      {
        this.addressError = true;    
      }
      else{
        this.addressError = false;
      }
      if(this.registerFormStep2.get("state").hasError('required'))
      {
        this.cityError = true;    
      }
      else{
        this.cityError = false;
      }
      if(this.registerFormStep2.get("city").hasError('required'))
      {
        this.stateError = true;    
      }
      else{
        this.stateError = false;
      }  
      if(this.registerFormStep2.get("country").hasError('required'))
      {
        this.countryError = true;    
      }
      else{
        this.countryError = false;
      } 

    }
  }  

  onRegister() {
    alert("enter");
    let self = this;
    this.error = "";
    this.accountIdError = "";

    this._usernameexists.username = this.registerForm.value.username;
    this._createuserstep1.companycode = this.registerForm.value.companycode;
    this._createuserstep1.username = this.registerForm.value.username;
    this._createuserstep1.password = this.registerForm.value.password; 

    alert(this._usernameexists.username + "\n" + this._createuserstep1.companycode + "\n" + this._createuserstep1.username + "\n" + this._createuserstep1.password);

    this.regPhase = 2;

/*   
    if (!this.isRegistrationValidated(this._createuserstep1, this._createuserstep2)) {

      this._registrationService.checkUser(this._usernameexists).subscribe(s => {
        if(s)
        {
          alert("user already exist");
        }
        else{
  
          this.regPhase = 2;
          this._registrationService.registerUserStep1(this._createuserstep1).subscribe(cus1 => {
            this._registrationService.registerUserStep2(this._createuserstep1.username, this._createuserstep2).subscribe(cus2 => {
              alert("done!");
            });
          });
        }
      });      

    }        


    this._createuserstep2.state = this.registerForm.value.state;
    this._createuserstep2.firstname = this.registerForm.value.firstname;
    this._createuserstep2.lastname = this.registerForm.value.lastname;
    this._createuserstep2.email = this.registerForm.value.email;
    this._createuserstep2.phone = this.registerForm.value.phone;
    this._createuserstep2.state = this.registerForm.value.state;
    this._createuserstep2.city = this.registerForm.value.city;
    this._createuserstep2.street = this.registerForm.value.street;
    this._createuserstep2.country = this.registerForm.value.country; 

    if (!this.isRegistrationValidated(this._createuserstep1, this._createuserstep2)) {

      this._registrationService.checkUser(this._usernameexists).subscribe(s => {
        if(s)
        {
          alert("user already exist");
        }
        else{
  
          this._registrationService.registerUserStep1(this._createuserstep1).subscribe(cus1 => {
            this._registrationService.registerUserStep2(this._createuserstep1.username, this._createuserstep2).subscribe(cus2 => {
              alert("done!");
            });
          });
        }
      });      

    }   
*/     

  }

  ResetPassword(_resetPassword: boolean) {
    this.displayResetPassword = _resetPassword;
  }

  private isRegistrationValidated(user1: Createuserstep1, user2: Createuserstep2): boolean {
    let noError = false;
    if (user1.companycode === null || user1.username === null || user1.password === null
      || user2.firstname === null || user2.lastname === null || user2.email === null
      || user2.street === null || user2.city === null || user2.phone === null
      || user2.state === null || user2.country === null) {
      this.error = "You must enter registration details."
      noError = true;
    } 
    return noError;
  }


  public onCheckUser() {

  }   


}
