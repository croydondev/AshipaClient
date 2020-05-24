import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrdersModule } from './orders/orders.module';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports:      [ BrowserModule, CoreModule, CustomersModule, OrdersModule, AppRoutingModule ],
  declarations: [ AppComponent, LandingComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
