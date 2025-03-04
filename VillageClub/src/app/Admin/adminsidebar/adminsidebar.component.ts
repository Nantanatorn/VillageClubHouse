import { Component } from '@angular/core';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent {
    isSidebarOpen = true;
    userName = 'Admin';
    
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
    
    logoutUser() {
      console.log('Logging out...');
    }
}
