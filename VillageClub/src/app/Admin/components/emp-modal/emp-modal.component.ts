import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-modal',
  templateUrl: './emp-modal.component.html',
  styleUrl: './emp-modal.component.css'
})
export class EmpModalComponent {
  newEmployee = {
    idCard: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '123456', // Default password
    position: 'Reception', // Locked position as Reception
    address: '',
    birthDate: ''
  };
  errorMessage: string = '';
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: HttpClient) {}

  ngOnInit() {
    flatpickr("#birthDate", {
      dateFormat: "Y-m-d", 
      enableTime: false
    });
  }
  
  submit() {
    this.http.post('http://localhost:5203/api/employee/add-employee', this.newEmployee)
      .subscribe(
        (response) => {
          // SweetAlert success message
          Swal.fire('Success', 'Employee added successfully!', 'success');
          this.resetForm();
          this.closeModal.emit(false);
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
          Swal.fire('Error', this.errorMessage, 'error');
        }
      );
  }

  resetForm() {
    // Reset form after submission
    this.newEmployee = {
      idCard: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '123456',
      position: 'Reception',
      address: '',
      birthDate: ''
    };
  }

  close() {
    this.closeModal.emit(false);
  }
}
