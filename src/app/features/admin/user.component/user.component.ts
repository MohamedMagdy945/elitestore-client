import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../core/services/user.service';
import { PaginationParams } from '../../../core/models/PaginationParams';
import { User } from '../../../core/models/user/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {

  users: User[] = [];

  private userService = inject(UserService);

  pagination: PaginationParams = {
    pageNumber: 1,
    pageSize: 10
  };

  loading = false;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;

  

    this.userService.GetUsersList(this.pagination).subscribe({
      next: (res) => {

        console.log('API Response:', res);

        this.users = res.data.items;

        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.users = [];
        this.loading = false;
      }
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log('search:', value);
  }

  onRoleFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log('role:', value);
  }

  getInitials(username: string): string {
    if (!username) return '';
    return username
      .trim()
      .split(' ')
      .filter(Boolean)
      .map(word => word[0].toUpperCase())
      .slice(0, 2)
      .join('');
  }

  formatDateToShort(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  formatTime(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString();
  }

  deleteUser(id: number) {
    console.log('delete user:', id);

    // مثال لو عندك API:
    // this.userService.deleteUser(id).subscribe(() => this.getUsers());
  }
}