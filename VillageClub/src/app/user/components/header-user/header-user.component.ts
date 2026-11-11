import { environment } from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlowbiteService } from '../../../Service/flowbite/flowbite.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { UserData, MyAccount } from '../../../Model/user.model';
import Swal from 'sweetalert2';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  isModalOpen = false;
  // สร้างตัวแปรเพื่อเก็บข้อมูลที่ผู้ใช้กรอก
  userData: Required<UserData> = {
    FirstName: '',
    LastName: '',
    Phone: '',
    BirthDate: '',
    Email: '',
    Password: ''
  };

  // ฟังก์ชันเพื่อเปิด Modal
  openModal(): void {
    this.loadUserData();  // โหลดข้อมูลก่อน
    this.isModalOpen = true;
  }

  // ฟังก์ชันเพื่อปิด Modal
  closeModal() {
    this.isModalOpen = false;
  }

  constructor(
    private http: HttpClient,
    private flowbiteService: FlowbiteService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  // ฟังก์ชัน logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
  updateUser(): void {
const payload = {
      FirstName: this.userData.FirstName,
      LastName: this.userData.LastName,
      Phone: this.userData.Phone,
      Email: this.userData.Email,
      BirthDate: this.userData.BirthDate,
      Password: this.userData.Password
    };
  
    const apiUrl = `${environment.apiUrl}/api/User/UserEdit`;
this.http.put(apiUrl, payload).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!'
        });
        this.closeModal();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating your profile!'
        });
        console.error('Update error:', error);
      }
    });
  }
  loadUserData(): void {
  
    this.http.get<MyAccount>(`${environment.apiUrl}/api/User/getmy`)
      .subscribe({
        next: (response) => {
          this.userData.FirstName = response.firstName;
          this.userData.LastName = response.lastName;
          this.userData.Phone = response.phone;
          this.userData.Email = response.email;
          this.userData.BirthDate = response.birthDate ? response.birthDate.split('T')[0] : '';
          this.userData.Password = '';
        },
        error: (err) => {
          Swal.fire('Error', 'Failed to load user data.', 'error');
          console.error('Load error:', err);
        }
      });
  }
  
  
}
