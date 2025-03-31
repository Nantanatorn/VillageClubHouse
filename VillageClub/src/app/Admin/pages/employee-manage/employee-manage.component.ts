import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';  // เพิ่ม SweetAlert2 สำหรับแจ้งเตือน

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.css']
})
export class EmployeeManageComponent implements OnInit {
  employee: any[] = []; // ใช้เก็บข้อมูลพนักงานจาก API
  showModal = false; // แสดงหรือซ่อน modal สำหรับเพิ่ม employee
  selectedEmployee: any;  // ใช้เก็บพนักงานที่ถูกเลือกแก้ไข
  isSidebarOpen = true;
  searchQuery = '';
  showModal1 = false;  // ใช้สำหรับแสดง/ซ่อน edit modal

  constructor(
    private flowbiteService: FlowbiteService,
    private http: HttpClient // ใช้ HttpClient ในการดึงข้อมูล
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // ดึงข้อมูลพนักงานจาก API
    this.http.get<any[]>('http://localhost:5203/api/employee/Empall')
      .subscribe(data => {
        this.employee = data; // เก็บข้อมูลที่ได้รับจาก API ลงใน employee
      }, error => {
        console.error('Error fetching employee data', error);
      });
  }

  get activeEmployeeCount(): number {
    return this.employee.filter(emp => emp.status === 'active').length; // นับจำนวนพนักงานที่สถานะเป็น active
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  performSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleModal() {
    this.showModal = !this.showModal;  // สลับการแสดง/ซ่อน modal สำหรับเพิ่ม employee
  }

  toggleModal1() {
    this.showModal1 = !this.showModal1;  // สลับการแสดง/ซ่อน edit modal
  }

  // Method to delete an employee
  deleteEmployee(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call API to delete the employee
        this.http.delete(`http://localhost:5203/api/employee/delete-employee/${id}`).subscribe(
          response => {
            // On success, remove the employee from the list and show success message
            this.employee = this.employee.filter(emp => emp.idCard !== id);
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
          },
          error => {
            // On error, show error message
            Swal.fire('Error', 'There was an error deleting the employee', 'error');
            console.error('Error deleting employee:', error);
          }
        );
      }
    });
  }

  // Open modal and pass the employee data for editing
  editEmployee(employee: any) {
    this.selectedEmployee = { ...employee };  // Create a copy of the employee data to avoid mutating original data
    this.toggleModal1();  // Open edit modal
  }

  // Update employee in the employee list
  updateEmployee(updatedEmployee: any) {
    const index = this.employee.findIndex(emp => emp.idCard === updatedEmployee.idCard);
    if (index !== -1) {
      this.employee[index] = updatedEmployee;  // Update employee in the list
    }
  }
}
