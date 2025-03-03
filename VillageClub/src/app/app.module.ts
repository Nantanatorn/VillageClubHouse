import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginUserComponent } from './User/login-user/login-user.component';
import { HeaderUserComponent } from './User/header-user/header-user.component';
import { HomeComponent } from './User/home/home.component';
import { RegisterUserComponent } from './User/register-user/register-user.component';
import { EmployeeManageComponent } from './Admin/employee-manage/employee-manage.component';
import { FacilityComponent } from './Admin/facility/facility.component';
import { ReservationComponent } from './User/reservation/reservation.component';
import { StatusComponent } from './User/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    HeaderUserComponent,
    HomeComponent,
    RegisterUserComponent,
    EmployeeManageComponent,
    FacilityComponent,
    ReservationComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
