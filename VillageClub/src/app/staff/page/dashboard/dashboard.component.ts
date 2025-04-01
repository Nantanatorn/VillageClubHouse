import { Component } from '@angular/core';
import { last } from 'rxjs';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { initFlowbite } from 'flowbite';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentView, ReservationStatusView } from '../../../Model/time';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private flowbiteService: FlowbiteService , private http: HttpClient) {}

    payments: PaymentView[] = [];
    reservations: ReservationStatusView[] = [];
    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
      this.loadPayments();
      this.loadRes();
    }

    loadPayments(): void {

  
      this.http.get<PaymentView[]>('http://localhost:5203/api/Payment/Paymentall')
        .subscribe({
          next: data => this.payments = data,
          error: err => console.error('Failed to load payments', err)
        });
    }

    loadRes(): void {
  
      this.http.get<ReservationStatusView[]>('http://localhost:5203/api/Payment/getReservationStatusAll')
        .subscribe({
          next: data => this.reservations = data,
          error: err => console.error('Failed to load payments', err)
        });
    }

    
    updateReservationStatus(reservation: any): void {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("กรุณา login ใหม่");
        return;
      }
    
      const headers = {
        'Authorization': `Bearer ${token}`
      };
    
      const payload = {
        R_Status: reservation.r_Status   // ใช้ตัว R ใหญ่
      };
    
      this.http.put(`http://localhost:5203/api/Reservation/updateStatus/${reservation.r_id}`, payload, { headers }).subscribe({
        next: () => {
          console.log('✅ สถานะอัปเดตเรียบร้อย');
        },
        error: (err) => {
          console.error('❌ อัปเดตสถานะไม่สำเร็จ', err);
        }
      });
    }
    

    updatePayStatus(payment: any): void {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("กรุณา login ใหม่");
        return;
      }
    
      const headers = {
        'Authorization': `Bearer ${token}`
      };
    
      const payload = {
        pay_Status: payment.pay_Status,
        verified_By: 'Admin01' 
      };
    
      this.http.put(`http://localhost:5203/api/Payment/updatePaymentStatus/${payment.pay_ID}`, payload, { headers }).subscribe({
        next: () => {
          console.log('✅ สถานะอัปเดตเรียบร้อย');
        },
        error: (err) => {
          console.error('❌ อัปเดตสถานะไม่สำเร็จ', err);
        }
      });
    }
    
    
    trackById(index: number, item: any): number {
      return item.r_id;
    }
    

}
