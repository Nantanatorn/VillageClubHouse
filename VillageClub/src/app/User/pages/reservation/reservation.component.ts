import { Component, OnInit, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import flatpickr from 'flatpickr';
import { TimetableSlot } from '../../../Model/time';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, AfterViewInit {

  facilities: any[] = [];
  reservationDate: string = '';
  flatpickrInstance: any = null;
  selectedFacility: any = null;
  timetables: TimetableSlot[] = [];
  showQRCode: boolean = false;
  paymentMethod: string = '';
  selectedSlot: TimetableSlot | null = null;
  reservationId: number | null = null;

  constructor(
    private flowbiteService: FlowbiteService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });

    this.http.get<any[]>('http://localhost:5203/api/facilities/getFacilities').subscribe(data => {
      this.facilities = data;
      this.cdRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.initializeFlatpickr();
  }

  initializeFlatpickr(): void {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);

    const datepicker = document.querySelector("#datepicker");

    if (datepicker) {
      this.flatpickrInstance = flatpickr(datepicker as HTMLInputElement, {
        enableTime: false,
        dateFormat: "d F Y",
        defaultDate: today,
        minDate: today,
        maxDate: maxDate,
        onChange: (selectedDates) => {
          this.reservationDate = selectedDates[0]
            ? selectedDates[0].toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : '';

          this.ngZone.run(() => {
            this.cdRef.detectChanges();
          });
        }
      });
    }
  }

  openModal(facility: any) {
    this.selectedFacility = facility;

    this.http.get<TimetableSlot[]>(`http://localhost:5203/api/facilities/getTimetable/${facility.fac_ID}`)
      .subscribe(times => {
        this.timetables = times;
        this.cdRef.detectChanges();

        setTimeout(() => {
          this.initializeFlatpickr();
        }, 100);
      });
  }

  closeModal(): void {
    this.resetDate();
  }

  getDurationFromLabel(label: string): number {
    const parts = label.split('-');
    if (parts.length !== 2) return 1; // default duration
  
    const start = parseFloat(parts[0].trim().replace(':', '.')); // "10.00" → 10
    const end = parseFloat(parts[1].trim().replace(':', '.'));   // "12.00" → 12
  
    if (isNaN(start) || isNaN(end)) return 1;
  
    const duration = end - start;
    return duration > 0 ? duration : 1;
  }
  

  confirmReservation(): void {
    if (!this.selectedSlot || !this.selectedFacility) {
      alert("กรุณาเลือกช่วงเวลาให้เรียบร้อยก่อนยืนยันการจอง");
      return;
    }
  
    const parsedDate = this.flatpickrInstance.selectedDates?.[0];
    const formattedDate = parsedDate ? format(parsedDate, 'yyyy-MM-dd') : null;
  
    if (!formattedDate) {
      alert("กรุณาเลือกวันที่ก่อนทำการจอง");
      return;
    } 
    const duration = this.getDurationFromLabel(this.selectedSlot.label);
  
    const request = {
      Fac_ID: this.selectedFacility.fac_ID,
      R_Date: formattedDate,
      R_Time: this.selectedSlot.label,
      R_Duration: duration
    };
  
    // ✅ แนบ Token
    const token = localStorage.getItem('token'); // หรือ sessionStorage แล้วแต่ที่ใช้
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.post('http://localhost:5203/api/Reservation/reserve', request, { headers }).subscribe({
      next: (res: any) => {
        alert("✅ จองสำเร็จ: " + res.message);
        this.reservationId = res.reservation.r_id;
        this.showQRCode = true;
      },
      error: (err) => {
        console.error(err);
        alert("❌ เกิดข้อผิดพลาดในการจอง");
      }
    });
  }
  

  resetDate(): void {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.clear();
    }
    this.reservationDate = '';
    this.timetables = [];
    this.selectedFacility = null;
    this.selectedSlot = null;
    this.showQRCode = false;
    this.paymentMethod = '';

    const timetableRadios = document.querySelectorAll('input[name="timetable"]') as NodeListOf<HTMLInputElement>;
    timetableRadios.forEach(radio => (radio.checked = false));

    this.cdRef.detectChanges();
  }

  payNow() {
    if (!this.paymentMethod || !this.reservationId) {
      Swal.fire('ข้อมูลไม่ครบ', 'กรุณาเลือกวิธีชำระเงิน หรือข้อมูลการจองไม่ครบ', 'warning');
      return;
    }
  
    const token = localStorage.getItem('token'); // ดึง JWT จาก local storage
  
    if (!token) {
      Swal.fire('Unauthorized', 'ไม่พบ Token, กรุณา login ใหม่', 'error');
      return;
    }
  
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    const payload = {
      R_id: this.reservationId,
      Pay_Method: this.paymentMethod
    };
  
    this.http.post('http://localhost:5203/api/Payment/pay', payload, { headers }).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: '✅ ชำระเงินสำเร็จ',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          this.showQRCode = false; // ปิด QR Code
          this.router.navigate(['/history']); // Redirect ไปหน้าประวัติการจอง
        });
      },
      error: (err) => {
        console.error("🚫 Payment Error", err);
        Swal.fire('🚫 เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการชำระเงิน: ' + err.message, 'error');
      }
    });
  }
  
  
  
  calculateTotalPrice(): number {
  if (!this.selectedFacility || !this.selectedSlot) return 0;

  const [startTime, endTime] = this.selectedSlot.label.split('-').map(time => time.trim());

  const startHour = parseInt(startTime.split(':')[0], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);

  const duration = endHour - startHour;

  return (duration * this.selectedFacility.fac_price ) / 2 ;
  }

}