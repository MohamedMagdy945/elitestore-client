import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {


  emailU: any;
  nameU: any;
  isOpen: boolean = false; 
  test: boolean = false;
  count() {
    return 1;
  }
  logged() : boolean {
    return false;
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  logOut() {
  }


  ngOnInit(): void {
  }
}
