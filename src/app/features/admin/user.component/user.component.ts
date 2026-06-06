import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  searchText = '';
  roleFilter = '';
  private userService = inject(UserService);
  private cdRef = inject(ChangeDetectorRef); // 1. حقن خدمة فحص التغييرات
  pagination: PaginationParams = {
    pageNumber: 1,
    pageSize: 10
  };


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.GetUsersList(this.pagination).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        // 2. إزالة الـ setTimeout وتحديث المصفوفة مباشرة
        this.users = [...res.data.items];

        // 3. إجبار أنجلر على تحديث الواجهة فوراً لمنع تعارض الحالات
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.users = [];
        this.cdRef.detectChanges();
      }
    });
  }
  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchSearch =
        user.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase());

      const matchRole =
        this.roleFilter ? user.role === this.roleFilter : true;

      return matchSearch && matchRole;
    });
  }

  onSearch(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
  }

  onRoleFilter(event: Event) {
    this.roleFilter = (event.target as HTMLSelectElement).value;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  formatDateToShort(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  formatTime(date: string): string {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  deleteUser(id: number) {
    console.log('delete user:', id);

    // مثال لو عندك API:
    // this.userService.deleteUser(id).subscribe(() => this.getUsers());
  }
}