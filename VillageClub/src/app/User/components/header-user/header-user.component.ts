import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
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
  userData = {
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
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  // ฟังก์ชัน logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }

  // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
  updateUser(): void {
    const token = localStorage.getItem('token');
  
    if (!token) {
      Swal.fire('Error', 'Token is missing', 'error');
      return;
    }
  
    const payload = {
      FirstName: this.userData.FirstName,
      LastName: this.userData.LastName,
      Phone: this.userData.Phone,
      Email: this.userData.Email,
      BirthDate: this.userData.BirthDate,
      Password: this.userData.Password
    };
  
    const apiUrl = 'http://localhost:5203/api/User/UserEdit';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.put(apiUrl, payload, { headers }).subscribe({
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
    const token = localStorage.getItem('token');
    
    if (!token) {
      Swal.fire('Error', 'Token is missing', 'error');
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.get<any>('http://localhost:5203/api/User/getmy', { headers })
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
