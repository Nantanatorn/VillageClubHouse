import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  
    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
    }
    
  users = [
    {
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890',
      room: 'Conference Room 1',
      status: 'Confirmed',
      people: 10,
      voucher: 'members',
    },
    {
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '0987654321',
      room: 'Meeting Room 2',
      status: 'Pending',
      people: 5,
      voucher: 'no members',
    },
    {
      firstname: 'Michael',
      lastname: 'Johnson',
      phone: '1112223333',
      room: 'Board Room',
      status: 'Confirmed',
      people: 8,
      voucher: 'members',
    },
    // ข้อมูลจองห้องเพิ่มเติม
  ];
}
