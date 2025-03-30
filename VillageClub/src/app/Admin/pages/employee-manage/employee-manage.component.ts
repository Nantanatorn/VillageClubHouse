import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrl: './employee-manage.component.css'
})
export class EmployeeManageComponent implements OnInit{
  employee = [
    { Name: 'Tan', Position: 'Reception', Address: '312',Phone : '1234567890',Status: 'Active' },
    { Name: 'Pas', Position: 'Reception', Address: '322',Phone : '1234567890',Status: 'Active' },
    { Name: 'Tae', Position: 'Reception', Address: '3233',Phone : '1234567890' ,Status: 'Active'},
  ];

  isSidebarOpen = true;
  searchQuery = '';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  performSearch() {
    console.log('Searching for:', this.searchQuery);
  }

}
