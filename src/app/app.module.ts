import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrdersModule } from './orders/orders.module';
import { LandingComponent, NgbdModalContent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ BrowserModule, CoreModule, CustomersModule, OrdersModule, AppRoutingModule, NgbModule ],
  declarations: [ AppComponent, LandingComponent, NgbdModalContent ],
  bootstrap:    [ AppComponent ],
  entryComponents: [NgbdModalContent]
})
export class AppModule { }
