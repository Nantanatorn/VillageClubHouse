import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../Service/flowbite service/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  isSidebarOpen = true;
  searchQuery = '';
  
  facilities = [
    { name: 'Gym', capacity: 50, status: 'Available' },
    { name: 'Swimming Pool', capacity: 30, status: 'Closed' },
    { name: 'Tennis Court', capacity: 10, status: 'Available' }
  ];
  
  bookings = [
    { date: '2025-03-05', facility: 'Gym', user: 'John Doe', duration: 2, status: 'Confirmed' },
    { date: '2025-03-06', facility: 'Swimming Pool', user: 'Jane Smith', duration: 1, status: 'Pending' }
  ];
  
  reservations = [
    { member: 'John Doe', facility: 'Gym', date: '2025-03-06', status: 'Confirmed' },
    { member: 'Jane Smith', facility: 'Swimming Pool', date: '2025-03-07', status: 'Pending' },
    { member: 'Mike Johnson', facility: 'Tennis Court', date: '2025-03-08', status: 'Confirmed' }
  ];
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  performSearch() {
    console.log('Searching for:', this.searchQuery);
  }
}