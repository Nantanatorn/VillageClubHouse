import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../Service/flowbite service/flowbite.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService,private router: Router) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  goHome() {
    this.router.navigate(['/adminhome']).then(() => {
      window.location.reload(); 
    });
  }
}
