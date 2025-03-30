import { Component } from '@angular/core';
import { HeaderUserComponent } from './User/components/header-user/header-user.component';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'VillageClub';

  ngOnInit(): void {
    initFlowbite();
  }

}
