import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { authInterceptor } from './Interceptor/auth.interceptor';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginUserComponent } from './user/pages/login-user/login-user.component';
import { HeaderUserComponent } from './user/components/header-user/header-user.component';
import { HomeComponent } from './user/pages/home/home.component';
import { RegisterUserComponent } from './user/pages/register-user/register-user.component';
import { EmployeeManageComponent } from './admin/pages/employee-manage/employee-manage.component';
import { FacilityComponent } from './admin/pages/facility/facility.component';
import { ReservationComponent } from './user/pages/reservation/reservation.component';
import { StatusComponent } from './user/pages/status/status.component';
import { AdminhomeComponent } from './admin/pages/adminhome/adminhome.component';
import { AdminsidebarComponent } from './admin/components/adminsidebar/adminsidebar.component';
import { BooknowComponent } from './user/components/booknow/booknow.component';
import { DropdownComponent } from './user/components/dropdown/dropdown.component';
import { FooterComponent } from './user/components/footer/footer.component';

// คอมโพเนนต์ที่อยู่ในไฟล์ที่สอง
import { DashboardComponent } from './staff/pages/dashboard/dashboard.component';
import { EditUserComponent } from './staff/pages/edit-user/edit-user.component';
import { StaffSidebarComponent } from './staff/components/staff-sidebar/staff-sidebar.component';
import { HistoryReservationComponent } from './user/pages/history-reservation/history-reservation.component';

// คอมโพเนนต์ที่อยู่ในไฟล์ที่หนึ่ง
import { EmpModalComponent } from './admin/components/emp-modal/emp-modal.component';
import { EmpEditModalComponent } from './admin/components/emp-edit-modal/emp-edit-modal.component';

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
    DashboardComponent,
    EditUserComponent,
    StaffSidebarComponent,
    HistoryReservationComponent,
    
    EmpModalComponent,
    EmpEditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
