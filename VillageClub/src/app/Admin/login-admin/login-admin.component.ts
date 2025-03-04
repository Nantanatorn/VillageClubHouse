import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/adminhome']).then(() => {
      window.location.reload(); 
    });
  }
}
