import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  filteredUsers: any[] = [];

  usersList() {
    throw new Error('Method not implemented.');
  }

  onSearch($event: Event) {
    throw new Error('Method not implemented.');
  }

  onRoleFilter($event: Event) {
    throw new Error('Method not implemented.');
  }

  getInitials(arg0: any) {
    throw new Error('Method not implemented.');
  }

  formatDateToShort(arg0: any) {
    throw new Error('Method not implemented.');
  }

  formatTime(arg0: any) {
    throw new Error('Method not implemented.');
  }

  deleteUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
