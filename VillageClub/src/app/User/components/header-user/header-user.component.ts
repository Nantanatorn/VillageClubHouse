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
  openModal() {
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
    const token = localStorage.getItem('token'); // ดึง JWT Token ที่เก็บใน localStorage

    // ตรวจสอบว่า token มีค่าไหม
    if (!token) {
      Swal.fire('Error', 'Token is missing', 'error');
      return;
    }

    const apiUrl = 'http://localhost:5203/api/User/UserEdit';

    // สร้าง HTTP headers ที่มี Authorization (JWT Token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(apiUrl, this.userData, { headers }).subscribe(
      (response) => {
        // แสดง SweetAlert เมื่ออัปเดตสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!'
        });

        // ปิด Modal หลังจากอัปเดตสำเร็จ
        this.closeModal();
      },
      (error) => {
        // แสดง SweetAlert เมื่อเกิดข้อผิดพลาด
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating your profile!'
        });
      }
    );
  }
}
