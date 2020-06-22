import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { FilterTextboxComponent } from './customers-list/filter-textbox.component';
import { CustomersComponent } from './customers.component';

import { LoginComponent } from './login/login.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { BillComponent } from './bill/bill.component';
import { PropertiesComponent } from './properties/properties.component';
import { GenerationComponent } from './generation/generation.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { YearComponent } from './year/year.component';
import { UrlGuardService } from './../services/auth.service';

const routes: Routes = [
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
    { path: 'customers', component: CustomersComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CustomersRoutingModule {}
