import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { Usernameexists } from '../../models/usernameexists';
import { Createuserstep1, Createuserrole } from '../../models/createuserstep1';
import { Createuserstep2 } from '../../models/createuserstep2';
import { Login, LoginResponse } from '../../models/login';

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.css']
})
export class CreateroleComponent implements OnInit {

  registerFormStep1: FormGroup = new FormGroup({
    role: new FormControl('', [Validators.required]),
    companyname: new FormControl('', [Validators.required]),
    companycode: new FormControl('', [Validators.required])    
  });  

  _usernameexists: Usernameexists = new Usernameexists();
  _createuserstep1: Createuserstep1 = new Createuserstep1();
  _createuserstep2: Createuserstep2 = new Createuserstep2(); 
  _createuserrole: Createuserrole = new Createuserrole(); 

  constructor(private _router: Router, private _registrationService: RegistrationService) { }

  ngOnInit() {
  }

  onRegisterFormSubmitStep1(form: FormGroup) {
    if (form.valid) {
      const model = form.value;  
      this._createuserrole.authenticationcode = "gf45fai8-jd~ubbd";
      this._createuserrole.companycode = model.companycode;
      this._createuserrole.companyname = model.companyname;                 
      this._createuserrole.role = model.role;
      
      this._registrationService.Createuserrole(this._createuserrole).subscribe(rolecreated => 
        {
          if(rolecreated)
          {
            if(this._createuserrole.role == "Customer")
            {
              //alert("customer");
              this._router.navigate(['/customer/register']);
            }
            else{
              //alert("operator");
              this._router.navigate(['/operator/register'])
            }
          }
          else{
            alert("account number already exist");
          }
        });

      //alert(this._createuserrole.companycode + "\n" + this._createuserrole.companyname + "\n" + this._createuserrole.role);

    }   
  }   

}
