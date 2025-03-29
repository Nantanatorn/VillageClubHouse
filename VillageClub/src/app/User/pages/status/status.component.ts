import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HttpClient } from '@angular/common/http';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'] // ✅ แก้ styleUrl → styleUrls (s)
})
export class StatusComponent implements OnInit {

  facilities: any[] = [];

  constructor(private flowbiteService: FlowbiteService, 
              private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });

    this.http.get<any[]>('http://localhost:5203/api/facilities/getFacilities').subscribe(data => {
      this.facilities = data;
    });

    // ✅ เรียกใช้ updateTime ตอนเริ่ม
    this.updateTime();
    // ✅ ตั้งเวลาให้ updateTime ทำงานทุก 1 วินาที
    setInterval(() => this.updateTime(), 1000);
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
