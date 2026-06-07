import { Component } from '@angular/core';
import { StaticItemsComponent } from '../static-items/static-items.component';

@Component({
  selector: 'app-slider',
  imports: [StaticItemsComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {}
