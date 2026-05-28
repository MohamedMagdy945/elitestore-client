import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../services/flowbite.service';
import { Footer } from '../../../shared/footer/footer';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-user-layout',
  imports: [
    Navbar,
    Footer,
    RouterOutlet
],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout implements OnInit {
 private flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}