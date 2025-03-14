import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // ✅ ตรวจสอบว่ามี RouterModule

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
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { AdminsidebarComponent } from './Admin/adminsidebar/adminsidebar.component';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { BooknowComponent } from './User/booknow/booknow.component';
import { DropdownComponent } from './User/dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './User/footer/footer.component';

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
    StatusComponent,
    AdminhomeComponent,
    AdminsidebarComponent,
    BooknowComponent,
    DropdownComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }