import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../Service/flowbite service/flowbite.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrl: './booknow.component.css'
})
export class BooknowComponent   implements  OnInit ,AfterViewInit  {

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  ngAfterViewInit() {
    flatpickr("#datepicker", {
      enableTime: false, // ปิดเลือกเวลา
      dateFormat: "l, d F Y", // เช่น "Wednesday, 30 June 2024"
      defaultDate: new Date(), // ตั้งค่าให้เริ่มที่วันปัจจุบัน
      minDate: "today" // ไม่ให้เลือกวันที่ผ่านมา
    });
  }

}
