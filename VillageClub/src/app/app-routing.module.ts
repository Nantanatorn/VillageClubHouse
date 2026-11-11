import { EditUserComponent } from './staff/pages/edit-user/edit-user.component';
import { authGuard } from './Guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './user/pages/login-user/login-user.component';
import { HomeComponent } from './user/pages/home/home.component';
import { RegisterUserComponent } from './user/pages/register-user/register-user.component';
import { ReservationComponent}from './user/pages/reservation/reservation.component';
import { StatusComponent } from './user/pages/status/status.component';
import { LoginAdminComponent } from './admin/pages/login-admin/login-admin.component';
import { AdminhomeComponent } from './admin/pages/adminhome/adminhome.component';
import { BooknowComponent}from './user/components/booknow/booknow.component';
import { DropdownComponent } from './user/components/dropdown/dropdown.component';
import { EmployeeManageComponent } from './admin/pages/employee-manage/employee-manage.component';
import { FacilityComponent } from './admin/pages/facility/facility.component';
import { DashboardComponent } from './staff/pages/dashboard/dashboard.component';
import { StaffLoginComponent } from './staff/pages/staff-login/staff-login.component';
import { HistoryReservationComponent } from './user/pages/history-reservation/history-reservation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component:LoginUserComponent },
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterUserComponent},
  {path:'reservation',component:ReservationComponent,canActivate:[authGuard]},
  {path:'status',component:StatusComponent,canActivate:[authGuard]},
  {path:'booknow',component:BooknowComponent,canActivate:[authGuard]},
  {path:'dropdown',component:DropdownComponent,canActivate:[authGuard]},
  {path:'history',component:HistoryReservationComponent,canActivate:[authGuard]},
  //admin page
  // {path:'admin',component:LoginAdminComponent},
  {path:'adminhome',component:AdminhomeComponent,canActivate:[authGuard],data:{roles:['Admin']}},
  {path:'employee-manage',component:EmployeeManageComponent,canActivate:[authGuard],data:{roles:['Admin']}},
  {path:'facility',component:FacilityComponent,canActivate:[authGuard],data:{roles:['Admin']}},

  //staffpage
  // {path:'staff',component:StaffLoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard],data:{roles:['staff','Admin']}},
  {path:'edit-user',component:EditUserComponent,canActivate:[authGuard],data:{roles:['staff','Admin']}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
