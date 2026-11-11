import { environment } from '../../../../environments/environment';
import { Component } from '@angular/core';
import { FlowbiteService } from '../../../Service/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { HttpClient } from '@angular/common/http';
import { PaymentView } from '../../../Model/payment.model';
import { ReservationStatusView } from '../../../Model/reservation.model';

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

  
      this.http.get<PaymentView[]>(`${environment.apiUrl}/api/Payment/Paymentall`)
        .subscribe({
          next: data => this.payments = data,
          error: err => console.error('Failed to load payments', err)
        });
    }

    loadRes(): void {
  
      this.http.get<ReservationStatusView[]>(`${environment.apiUrl}/api/Payment/getReservationStatusAll`)
        .subscribe({
          next: data => this.reservations = data,
          error: err => console.error('Failed to load payments', err)
        });
    }

    
    updateReservationStatus(reservation: ReservationStatusView): void {
      const payload = {
        R_Status: reservation.r_Status   // ใช้ตัว R ใหญ่
      };
    
      this.http.put(`${environment.apiUrl}/api/Reservation/updateStatus/${reservation.r_id}`, payload).subscribe({
        next: () => {
          console.log('✅ สถานะอัปเดตเรียบร้อย');
        },
        error: (err) => {
          console.error('❌ อัปเดตสถานะไม่สำเร็จ', err);
        }
      });
    }
    

    updatePayStatus(payment: PaymentView): void {
      const payload = {
        pay_Status: payment.pay_Status,
        verified_By: 'Admin01' 
      };
    
      this.http.put(`${environment.apiUrl}/api/Payment/updatePaymentStatus/${payment.pay_ID}`, payload).subscribe({
        next: () => {
          console.log('✅ สถานะอัปเดตเรียบร้อย');
        },
        error: (err) => {
          console.error('❌ อัปเดตสถานะไม่สำเร็จ', err);
        }
      });
    }
    
    
    trackById(index: number, item: ReservationStatusView): number {
      return item.r_id;
    }
    

}
