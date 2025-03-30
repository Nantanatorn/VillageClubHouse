import { Component } from '@angular/core';
import { last } from 'rxjs';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  
    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
    }
  reservations = [
    {
      reservationId: 1,
      roomName: 'Conference Room 1',
      firstname: 'somsri',
      lastname:'Jaiyai',
      startDateTime: '2025-03-30 09:00',
      endDateTime: '2025-03-30 12:00',
      status: 'Confirmed',
    },
    {
      reservationId: 2,
      roomName: 'Meeting Room 2',
      firstname: 'somsri',
      lastname:'Jaiyai',
      startDateTime: '2025-03-31 14:00',
      endDateTime: '2025-03-31 16:00',
      status: 'Pending',
    },
    {
      reservationId: 3,
      roomName: 'Board Room',
      firstname: 'somsri',
      lastname:'Jaiyai',
      startDateTime: '2025-04-01 10:00',
      endDateTime: '2025-04-01 12:00',
      status: 'Confirmed',
    },
  ];
}
