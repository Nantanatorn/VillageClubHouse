import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../Service/flowbite.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService,private router: Router) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  goHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); // รีเฟรชหลังจากเปลี่ยนหน้า
    });
  }

  goReg() {
    this.router.navigate(['/reg']);
  }
}
