import { Component } from '@angular/core';
import { SliderComponent } from '../../features/Home/slider/slider.component';

@Component({
  selector: 'app-home',
  imports: [SliderComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
