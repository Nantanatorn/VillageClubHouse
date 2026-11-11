import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import flatpickr from 'flatpickr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-modal',
  templateUrl: './emp-modal.component.html',
  styleUrl: './emp-modal.component.css'
})
export class EmpModalComponent implements OnInit, OnDestroy {
  private birthDatePicker?: flatpickr.Instance | flatpickr.Instance[];
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
    this.birthDatePicker = flatpickr("#birthDate", {
      dateFormat: "Y-m-d", 
      enableTime: false
    });
  }
  
  ngOnDestroy(): void {
    [this.birthDatePicker ?? []].flat().forEach(picker => picker.destroy());
  }

  submit() {
    this.http.post(`${environment.apiUrl}/api/employee/add-employee`, this.newEmployee)
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
