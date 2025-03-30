import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent implements OnInit{
constructor(private flowbiteService: FlowbiteService,private router: Router) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  goHome() {
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload(); 
    });
  }
}
