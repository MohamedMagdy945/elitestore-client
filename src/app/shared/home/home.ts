import { Component } from '@angular/core';
import { SliderComponent } from '../../features/Home/slider/slider.component';
import { CategoryHomeComponents } from '../../features/Home/category-home/category-home.component';
import { ProductComponent } from '../../features/Home/product/product.component';

@Component({
  selector: 'app-home',
  imports: [SliderComponent, CategoryHomeComponents, ProductComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
