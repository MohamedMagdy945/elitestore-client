import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../services/flowbite.service';

@Component({
  selector: 'app-admin-layout',
  imports: [
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {
 constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}