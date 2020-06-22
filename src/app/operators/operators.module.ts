import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OperatorloginComponent } from './operatorlogin/operatorlogin.component';
import { OperatormainComponent } from './operatormain/operatormain.component';
import { OperatorregisterComponent } from './operatorregister/operatorregister.component';



@NgModule({
  declarations: [MainComponent, LoginComponent, RegisterComponent, OperatorloginComponent, OperatormainComponent, OperatorregisterComponent],
  imports: [
    CommonModule
  ]
})
export class OperatorsModule { }
