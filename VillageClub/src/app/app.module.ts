import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // ✅ ตรวจสอบว่ามี RouterModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginUserComponent } from './User/pages/login-user/login-user.component';
import { HomeComponent } from './User/pages/home/home.component';
import { RegisterUserComponent } from './User/pages/register-user/register-user.component';
import { ReservationComponent}from './User/pages/reservation/reservation.component';
import { StatusComponent } from './User/pages/status/status.component';
import { LoginAdminComponent } from './Admin/pages/login-admin/login-admin.component';
import { AdminhomeComponent } from './Admin/pages/adminhome/adminhome.component';
import { BooknowComponent}from './User/components/booknow/booknow.component';
import { DropdownComponent } from './User/components/dropdown/dropdown.component';
import { EditProfileComponent } from './User/components/edit-profile/edit-profile.component';
import { AdminsidebarComponent } from './Admin/components/adminsidebar/adminsidebar.component';
import { EmployeeManageComponent } from './Admin/pages/employee-manage/employee-manage.component';
import { FacilityComponent } from './Admin/pages/facility/facility.component';
import { FooterComponent } from './User/components/footer/footer.component';
import { HeaderUserComponent } from './User/components/header-user/header-user.component';
import { EmpModalComponent } from './Admin/components/emp-modal/emp-modal.component';



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
    EditProfileComponent,
    EmpModalComponent,
  
    
    
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