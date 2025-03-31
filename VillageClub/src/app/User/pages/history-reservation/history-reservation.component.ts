import { Component } from '@angular/core';

@Component({
  selector: 'app-history-reservation',
  templateUrl: './history-reservation.component.html',
  styleUrl: './history-reservation.component.css'
})
export class HistoryReservationComponent {
  facilities: string[] = [
    'ฟิตเนส',
    'สระว่ายน้ำ',
    'ห้องจัดเลี้ยง',
    'สนามเทนนิส',
    'สนามแบตมินตัน',
    'สนามฟุตบอล'
  ];
  reservations = [
    {
      id: 1,
      facility: 'สนามฟุตบอล',
      date: '2025-04-01',
      time: '10:00',
      status: 'รออนุมัติ',
      
    },
    {
      id: 2,
      facility: 'สระว่ายน้ำ',
      date: '2025-04-02',
      time: '15:00',
      status: 'อนุมัติแล้ว',
      
    }
  ];

  editReservation: any = null;

openEditModal(reservation: any) {
  this.editReservation = { ...reservation }; // clone เพื่อแก้ไข
}

closeModal() {
  this.editReservation = null;
}

saveEdit() {
  const index = this.reservations.findIndex(r => r.id === this.editReservation.id);
  if (index > -1) {
    this.reservations[index] = { ...this.editReservation };
  }
  this.closeModal();
}

}
