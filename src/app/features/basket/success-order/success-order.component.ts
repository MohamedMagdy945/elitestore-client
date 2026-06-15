import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-success-order',
  imports: [DatePipe],
  templateUrl: './success-order.component.html',
  styleUrl: './success-order.component.css',
})
export class SuccessOrderComponent {
    today = new Date();

}
