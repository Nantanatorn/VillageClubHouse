import { Component } from '@angular/core';
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
      private authService: AuthService
    ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  
}
