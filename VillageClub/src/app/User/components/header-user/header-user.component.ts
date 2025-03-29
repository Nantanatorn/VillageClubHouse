import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Service/flowbite service/flowbite.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit{
  


  constructor(private flowbiteService: FlowbiteService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logout(): void {
    // ตรวจสอบว่ากำลังทำงานในเบราว์เซอร์
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }

}
