import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LogoutComponent } from './logout/logout.component';


import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { FilterTextboxComponent } from './customers/customers-list/filter-textbox.component';
import { CustomersComponent } from './customers/customers.component';

import { LoginComponent } from './customers/login/login.component';
import { ConsumptionComponent } from './customers/consumption/consumption.component';
import { BillComponent } from './customers/bill/bill.component';
import { PropertiesComponent } from './customers/properties/properties.component';
import { GenerationComponent } from './customers/generation/generation.component';
import { MainComponent } from './customers/main/main.component';
import { RegisterComponent } from './customers/register/register.component';

import { DayComponent } from './customers/day/day.component';
import { MonthComponent } from './customers/month/month.component';
import { YearComponent } from './customers/year/year.component';
import { UrlGuardService } from './services/auth.service';
import { CreateroleComponent } from './admin/createrole/createrole.component';

import { OperatorloginComponent } from './operators/operatorlogin/operatorlogin.component';
import { OperatormainComponent } from './operators/operatormain/operatormain.component';
import { OperatorregisterComponent } from './operators/operatorregister/operatorregister.component';

const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'logout', component: LogoutComponent },
    //{ path: '', pathMatch: 'full', redirectTo: 'customer/login'},
    //{ path: '**', pathMatch: 'full', redirectTo: 'customer/login' },
    { path: 'customer/main', component: MainComponent, canActivate: [UrlGuardService] },
    { path: 'customer/login', component: LoginComponent },
    { path: 'customer/consumption', component: ConsumptionComponent, canActivate: [UrlGuardService] },
    { path: 'customer/bill', component: BillComponent, canActivate: [UrlGuardService] },
    { path: 'customer/properties', component: PropertiesComponent, canActivate: [UrlGuardService] },
    { path: 'customer/generation', component: GenerationComponent, canActivate: [UrlGuardService] },
    { path: 'customer/register', component: RegisterComponent },
    { path: 'customer/day', component: DayComponent, canActivate: [UrlGuardService] },
    { path: 'customer/month', component: MonthComponent, canActivate: [UrlGuardService] },
    { path: 'customer/year', component: YearComponent, canActivate: [UrlGuardService] },     
    { path: 'customers', component: CustomersComponent },
    { path: 'admin/createrole', component: CreateroleComponent },
    { path: 'operator/main', component: OperatormainComponent },
    { path: 'operator/login', component: OperatorloginComponent },
    { path: 'operator/register', component: OperatorregisterComponent }    
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
