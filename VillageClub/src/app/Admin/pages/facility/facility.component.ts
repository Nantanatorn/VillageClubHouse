import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ใช้ HttpClient สำหรับดึงข้อมูลจาก API
import Swal from 'sweetalert2'; // Import SweetAlert2 for notifications
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { EditableSlot } from '../../../Model/time';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {

  // ✅ Data Properties
  facilities: any[] = []; 
  newFacility = { fac_Name: '', fac_Description: '', fac_Capacity: 0,fac_Status: 'Active' };
  selectedFacility: any = {}; 
  searchQuery = '';
  editableTimeSlots: EditableSlot[] = [];
  


  // ✅ UI State
  isSidebarOpen = true;
  showEditModal = false;  
  showEditModal1 = false;
  showAddModal = false;

  constructor(private flowbiteService: FlowbiteService, private http: HttpClient) {}

  
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });

    this.loadFacilities();
  }
  
  // ✅ Load All Facilities
  loadFacilities(): void {
    this.http.get<any[]>('http://localhost:5203/api/facilities/getFacilities').subscribe({
      next: data => this.facilities = data,
      error: err => console.error('Error fetching facilities:', err)
    });
  }

  // ✅ Facility Status Count
  get activeFacilityCount(): number {
    return this.facilities.filter(facility => facility.fac_Status === 'Active').length;
  }

  get inactiveFacilityCount(): number {
    return this.facilities.filter(facility => facility.fac_Status === 'Inactive').length;
  }

  // ✅ Sidebar / Modal Controls
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleEditModal(facility: any) {
    this.selectedFacility = { ...facility };  
    this.showEditModal = !this.showEditModal;  
  }

  performSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  
  // ✅ Facility Update (ชื่อ, คำอธิบาย, สถานะ, ความจุ)
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
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Facility updated successfully!'
            });
          },
          error => {
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
  updateLabel(slot: any): void {
    if (slot.start && slot.end) {
      slot.label = `${slot.start} - ${slot.end}`;
    }
  }
  
  
  // ✅ Toggle Time Slot Modal
  toggleTimeEditModal(facility: any): void {
    this.selectedFacility = { ...facility };
  
    this.http.get<any[]>(`http://localhost:5203/api/facilities/getTimetable/${facility.fac_ID}`).subscribe(slots => {
      this.editableTimeSlots = slots.map(slot => ({
        label: slot.label,
        isAvailable: slot.isAvailable,
        slot_ID: slot.slot_ID
      }));
      this.showEditModal1 = !this.showEditModal1;
    });
  }
  
  // ✅ Time Slot Editing Functions
  addTimeSlot(): void {
    this.editableTimeSlots.push({
      label: '',
      isAvailable: true,
      editing: true,    // ✅ เพิ่มตรงนี้เพื่อเปิดแก้ไขทันที
      start: '',
      end: ''
    });
  }
  
  
  removeTimeSlot(index: number): void {
    this.editableTimeSlots.splice(index, 1);
  }
  
  addTimeSlotToDB(slot: any): void {
    const [start, end] = slot.label.split('-').map((t: string) => t.trim());
    const startTime = this.convertToTime(start);
    const endTime = this.convertToTime(end);
  
    const payload = {
      fac_ID: this.selectedFacility.fac_ID,
      label: slot.label,
      isAvailable: slot.isAvailable,
      startTime,
      endTime
    };
  
    this.http.post<any>('http://localhost:5203/api/facilities/AddTime', payload).subscribe({
      next: (res) => {
        // แทรก slot_ID ที่ได้กลับมา
        slot.slot_ID = res.model?.slot_ID || null;
      },
      error: () => {
        console.error("❌ Failed to add slot");
      }
    });
  }
  
  // แก้ไข time slot เดิม
  editTimeSlot(slot: any): void {
    if (!slot.slot_ID) return;
  
    const [start, end] = slot.label.split('-').map((t: string) => t.trim());
    const startTime = this.convertToTime(start);
    const endTime = this.convertToTime(end);
  
    const payload = {
      label: slot.label,
      isAvailable: slot.isAvailable,
      startTime,
      endTime
    };
  
    this.http.put(`http://localhost:5203/api/facilities/EditTime/${slot.slot_ID}`, payload).subscribe({
      next: () => {
        // Optional: update UI state
      },
      error: () => {
        console.error("❌ Failed to edit slot");
      }
    });
  }
  
  deleteTimeSlot(slotId: number): void {
    Swal.fire({
      title: 'ต้องการลบหรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:5203/api/facilities/DeleteTime/${slotId}`).subscribe({
          next: () => {
            Swal.fire('✅ ลบเรียบร้อย', '', 'success');
            this.toggleTimeEditModal(this.selectedFacility);
          },
          error: () => Swal.fire('❌ ลบไม่สำเร็จ', '', 'error')
        });
      }
    });
  }
  
  convertToTime(str: string): string {
    const [hour, minute] = str.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
  }

  
  toggleAddModal(): void {
    this.showAddModal = !this.showAddModal;
  }

  addFacility(): void {
    if (!this.newFacility.fac_Name || !this.newFacility.fac_Description || this.newFacility.fac_Capacity <= 0) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    this.http.post('http://localhost:5203/api/facilities/addFacility', this.newFacility).subscribe({
      next: () => {
        this.loadFacilities(); // reload facility list
        this.toggleAddModal(); // close modal
        this.newFacility = { fac_Name: '', fac_Description: '', fac_Capacity: 0, fac_Status: 'Active' }; // reset
      },
      error: (err) => {
        console.error('เพิ่ม facility ล้มเหลว', err);
      }
    });
  }
}
