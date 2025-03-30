import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent implements OnInit{

  
    constructor(private flowbiteService: FlowbiteService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: object,
    ) {}
  

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  
    isSidebarOpen = true;
    userName = 'Admin';
    
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
    
    logoutUser(): void {
        // ตรวจสอบว่ากำลังทำงานในเบราว์เซอร์
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
}
