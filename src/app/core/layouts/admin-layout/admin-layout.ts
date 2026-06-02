import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../services/flowbite.service';
import { AdminSidebar } from "../../../shared/admin-sidebar/admin-sidebar";
import { RouterOutlet } from "@angular/router";
import { AdminHeader } from '../../../shared/admin-header/admin-header';

@Component({
  selector: 'app-admin-layout',
  imports: [
    AdminHeader,
    AdminSidebar,
    RouterOutlet,
    
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