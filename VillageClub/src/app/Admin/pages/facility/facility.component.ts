import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ใช้ HttpClient สำหรับดึงข้อมูลจาก API
import Swal from 'sweetalert2'; // Import SweetAlert2 for notifications
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {
  facilities: any[] = [];  // เก็บข้อมูล facilities ที่ได้จาก API
  newFacility = {           // ข้อมูลสำหรับ facility ใหม่
    fac_Name: '',
    fac_Description: '',
    fac_Capacity: 0
  };
  isSidebarOpen = true;
  showModal = false;  // ใช้แสดงหรือซ่อน modal สำหรับเพิ่ม facility
  showEditModal = false;  // ใช้แสดงหรือซ่อน modal สำหรับแก้ไข facility
  selectedFacility: any = {}; // ใช้เก็บข้อมูล facility ที่จะทำการแก้ไข
  searchQuery = '';

  constructor(private flowbiteService: FlowbiteService, private http: HttpClient) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // ดึงข้อมูล facilities จาก API
    this.http.get<any[]>('http://localhost:5203/api/facilities/getFacilities')
      .subscribe(data => {
        this.facilities = data;  // เก็บข้อมูลที่ได้จาก API ใน facilities
      }, error => {
        console.error('Error fetching facilities data', error);
      });
  }

  // ฟังก์ชันคำนวณจำนวน facilities ที่เป็น Active
  get activeFacilityCount(): number {
    return this.facilities.filter(facility => facility.fac_Status === 'Active').length;
  }

  // ฟังก์ชันคำนวณจำนวน facilities ที่เป็น Inactive
  get inactiveFacilityCount(): number {
    return this.facilities.filter(facility => facility.fac_Status === 'Inactive').length;
  }

  performSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleModal() {
    this.showModal = !this.showModal;  // สลับการแสดง/ซ่อน modal สำหรับเพิ่ม facility
  }

  toggleEditModal(facility: any) {
    this.selectedFacility = { ...facility };  // ดึงข้อมูล facility ที่จะทำการแก้ไข
    this.showEditModal = !this.showEditModal;  // สลับการแสดง/ซ่อน modal สำหรับแก้ไข facility
  }

  // ฟังก์ชันสำหรับแก้ไข facility
  editFacility() {
    if (this.selectedFacility.fac_Name && this.selectedFacility.fac_Description && this.selectedFacility.fac_Capacity) {
      const id = this.selectedFacility.fac_ID; // ใช้ ID ของ facility ที่จะอัปเดต

      this.http.put(`http://localhost:5203/api/facilities/editFacility/${id}`, this.selectedFacility)
        .subscribe(
          (response: any) => {
            const updatedFacility = response.facility;
            const index = this.facilities.findIndex(fac => fac.fac_ID === updatedFacility.fac_ID);
            if (index !== -1) {
              this.facilities[index] = updatedFacility;  // อัปเดตข้อมูล facility ใน list
            }
            this.showEditModal = false;  // ปิด modal
            // ใช้ SweetAlert2 แสดงข้อความสำเร็จ
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Facility updated successfully!'
            });
          },
          error => {
            // ใช้ SweetAlert2 แสดงข้อความข้อผิดพลาด
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error updating the facility. Please try again.'
            });
            console.error('Error updating facility:', error);
          }
        );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Data',
        text: 'Please fill in all fields before submitting.'
      });
    }
  }
}
