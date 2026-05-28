import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
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
