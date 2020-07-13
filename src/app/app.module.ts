import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
//import { CustomersModule } from './customers/customers.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrdersModule } from './orders/orders.module';
import { LandingComponent, NgbdModalContent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './widgets/toast-container/toast-container.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { FilterTextboxComponent } from './customers/customers-list/filter-textbox.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersRoutingModule } from './customers/customers-routing.module';
import { LoginComponent } from './customers/login/login.component';
import { ConsumptionComponent } from './customers/consumption/consumption.component';
import { BillComponent } from './customers/bill/bill.component';
import { PropertiesComponent } from './customers/properties/properties.component';
import { GenerationComponent } from './customers/generation/generation.component';
import { MainComponent } from './customers/main/main.component';
import { DayComponent } from './customers/day/day.component';
import { MonthComponent } from './customers/month/month.component';
import { YearComponent } from './customers/year/year.component';

import { HighchartsChartModule } from 'highcharts-angular';


import { RegisterComponent } from './customers/register/register.component';
import { MydetailsComponent } from './customers/mydetails/mydetails.component';
import { MyrewardsComponent } from './customers/myrewards/myrewards.component';
import { ChargetariffComponent } from './customers/chargetariff/chargetariff.component';
import { MarketpreferencesComponent } from './customers/marketpreferences/marketpreferences.component';
import { CreateroleComponent } from './admin/createrole/createrole.component';


import { OperatorloginComponent } from './operators/operatorlogin/operatorlogin.component';
import { OperatormainComponent } from './operators/operatormain/operatormain.component';
import { OperatorregisterComponent } from './operators/operatorregister/operatorregister.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({

    imports: [ 
        BrowserModule, 
        CoreModule, 
        OrdersModule, 
        AppRoutingModule,
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
        SharedModule, 
        CustomersRoutingModule,  
        HighchartsChartModule,
        NgbModule
     ],
    declarations: [ AppComponent, 
      LandingComponent, NgbdModalContent, FilterTextboxComponent,
      OperatorloginComponent, OperatormainComponent, OperatorregisterComponent,
      CustomersListComponent,
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
                    ToastContainerComponent,
                    MarketpreferencesComponent,
                    CreateroleComponent,
                    LogoutComponent],
                    bootstrap:    [ AppComponent ],
                    entryComponents: [NgbdModalContent]  
})
export class AppModule { }
