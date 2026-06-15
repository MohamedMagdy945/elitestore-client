import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-success',
  imports: [CommonModule],
  templateUrl: './toast-success.component.html',
  styleUrl: './toast-success.component.css',
})
export class ToastSuccessComponent {
  private toastService = inject(ToastService);
  message$ = this.toastService.message$;


}
