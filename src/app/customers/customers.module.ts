import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { FilterTextboxComponent } from './customers-list/filter-textbox.component';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { LoginComponent } from './login/login.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { BillComponent } from './bill/bill.component';
import { PropertiesComponent } from './properties/properties.component';
import { GenerationComponent } from './generation/generation.component';
import { MainComponent } from './main/main.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { YearComponent } from './year/year.component';

import { HighchartsChartModule } from 'highcharts-angular';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { MydetailsComponent } from './mydetails/mydetails.component';
import { MyrewardsComponent } from './myrewards/myrewards.component';
import { ChargetariffComponent } from './chargetariff/chargetariff.component';
import { MarketpreferencesComponent } from './marketpreferences/marketpreferences.component';

@NgModule({
    imports: [ 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
        SharedModule, 
        CustomersRoutingModule,  
        HighchartsChartModule,
        NgbModule
     ],
    declarations: [ CustomersListComponent, FilterTextboxComponent,
                    CustomersComponent,
                    LoginComponent,
                    ConsumptionComponent,
                    BillComponent,
                    PropertiesComponent,
                    GenerationComponent,
                    MainComponent,
                    DayComponent,
                    MonthComponent,
                    YearComponent,
                    RegisterComponent,
                    MydetailsComponent,
                    MyrewardsComponent,
                    ChargetariffComponent,
                    MarketpreferencesComponent]
})
export class CustomersModule { }
