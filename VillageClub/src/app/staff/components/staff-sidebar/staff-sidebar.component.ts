import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-staff-sidebar',
  templateUrl: './staff-sidebar.component.html',
  styleUrl: './staff-sidebar.component.css'
})
export class StaffSidebarComponent {

   constructor(
      private router: Router,
      private authService: AuthService,
      @Inject(PLATFORM_ID) private platformId: object
    ) {}

  logout(): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    }
  
}
