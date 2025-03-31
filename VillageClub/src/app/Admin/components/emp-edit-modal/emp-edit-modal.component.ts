import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-edit-modal',
  templateUrl: './emp-edit-modal.component.html',
  styleUrls: ['./emp-edit-modal.component.css']
})
export class EmpEditModalComponent {
  @Input() employee: any;  // รับข้อมูลพนักงานจาก parent
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() updateEmployee: EventEmitter<any> = new EventEmitter();
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  submit() {
    const url = `http://localhost:5203/api/employee/edit-employee/${this.employee.id}`;

    // ส่งข้อมูลที่แก้ไขไปยัง API
    this.http.put(url, this.employee).subscribe(
      (response) => {
        Swal.fire('Success', 'Employee updated successfully!', 'success');
        this.updateEmployee.emit(this.employee);  // ส่งข้อมูลที่อัพเดทไปยัง parent
        this.close();
      },
      (error) => {
        this.errorMessage = error.error.message || 'An error occurred';
        Swal.fire('Error', this.errorMessage, 'error');
      }
    );
  }

  close() {
    this.closeModal.emit(false);  // ปิด modal
  }
}
