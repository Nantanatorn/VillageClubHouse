import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../Service/flowbite service/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService) {}

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
    
    logoutUser() {
      console.log('Logging out...');
    }
}
