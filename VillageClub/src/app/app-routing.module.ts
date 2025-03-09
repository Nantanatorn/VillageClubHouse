import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './User/login-user/login-user.component';
import { HomeComponent } from './User/home/home.component';
import { RegisterUserComponent } from './User/register-user/register-user.component';
import { ReservationComponent } from './User/reservation/reservation.component';
import { StatusComponent } from './User/status/status.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { BooknowComponent } from './User/booknow/booknow.component';
import { DropdownComponent } from './User/dropdown/dropdown.component';


const routes: Routes = [
  {path:'',component:LoginUserComponent},
  {path:'home',component:HomeComponent},
  {path:'reg',component:RegisterUserComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'status',component:StatusComponent},
  {path:'booknow',component:BooknowComponent},
  {path:'dropdown',component:DropdownComponent},
  //admin page
  {path:'admin',component:LoginAdminComponent},
  {path:'adminhome',component:AdminhomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
