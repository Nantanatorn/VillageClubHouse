import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReservationPayment } from '../../../Model/time';


@Component({
  selector: 'app-history-reservation',
  templateUrl: './history-reservation.component.html',
  styleUrls: ['./history-reservation.component.css']
})
export class HistoryReservationComponent implements OnInit {
  reservations: ReservationPayment[] = [];
  editReservation: ReservationPayment | null = null;

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

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.loadReservations();
  }

  loadReservations(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<ReservationPayment[]>('http://localhost:5203/api/Payment/getresavtionhis', { headers }).subscribe({
      next: (data) => {
        this.reservations = data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error("Error fetching reservation history:", err);
        console.log("Please check");
      }
    });
  }

  openEditModal(reservation: ReservationPayment) {
    this.editReservation = { ...reservation };
  }

  closeModal() {
    this.editReservation = null;
  }

  saveEdit() {
    const index = this.reservations.findIndex(r => r.r_id === this.editReservation?.r_id);
    if (index > -1 && this.editReservation) {
      this.reservations[index] = { ...this.editReservation };
    }
    this.closeModal();
  }

  updateTime(): void {
    const now = new Date();
    const formattedTime = now.toLocaleString('th-TH', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const element = document.getElementById("updateTime");
    if (element) {
      element.innerText = formattedTime;
    }
  }
}
