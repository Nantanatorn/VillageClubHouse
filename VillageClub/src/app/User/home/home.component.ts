import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlowbiteService } from '../../Service/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService ,private router: Router) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    setTimeout(() => {
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });
    }, 500);
  }

}
