import { EditUserComponent } from './staff/page/edit-user/edit-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './User/pages/login-user/login-user.component';
import { HomeComponent } from './User/pages/home/home.component';
import { RegisterUserComponent } from './User/pages/register-user/register-user.component';
import { ReservationComponent}from './User/pages/reservation/reservation.component';
import { StatusComponent } from './User/pages/status/status.component';
import { LoginAdminComponent } from './Admin/pages/login-admin/login-admin.component';
import { AdminhomeComponent } from './Admin/pages/adminhome/adminhome.component';
import { BooknowComponent}from './User/components/booknow/booknow.component';
import { DropdownComponent } from './User/components/dropdown/dropdown.component';
import { EmployeeManageComponent } from './Admin/pages/employee-manage/employee-manage.component';
import { FacilityComponent } from './Admin/pages/facility/facility.component';
import { DashboardComponent } from './staff/page/dashboard/dashboard.component';
import { StaffLoginComponent } from './staff/page/staff-login/staff-login.component';
import { HistoryReservationComponent } from './User/pages/history-reservation/history-reservation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component:LoginUserComponent },
  {path:'home',component:HomeComponent},
  {path:'reg',component:RegisterUserComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'status',component:StatusComponent},
  {path:'booknow',component:BooknowComponent},
  {path:'dropdown',component:DropdownComponent},
  {path:'history',component:HistoryReservationComponent},
  //admin page
  {path:'admin',component:LoginAdminComponent},
  {path:'adminhome',component:AdminhomeComponent},
  {path:'employee-manage',component:EmployeeManageComponent},
  {path:'facility',component:FacilityComponent},

  //staffpage
  {path:'staff',component:StaffLoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'editUser',component:EditUserComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
