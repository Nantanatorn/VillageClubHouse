import { Component, OnInit } from '@angular/core';

import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { FlowbiteService } from '../../../Service/flowbite/flowbite.service';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent implements OnInit{

  
    constructor(private flowbiteService: FlowbiteService,
                private router: Router,
                private authService: AuthService,
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
      this.authService.logout();
      this.router.navigate(['/']);
    }
}
