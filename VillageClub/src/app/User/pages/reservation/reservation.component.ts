import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{

  facilities: any[] = [];

  constructor(private flowbiteService: FlowbiteService,
              private http: HttpClient,
              private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.http.get<any[]>('http://localhost:5203/api/facilities/getFacilities').subscribe(data => {
      this.facilities = data;

      this.cdRef.detectChanges();
    });
  }

}
