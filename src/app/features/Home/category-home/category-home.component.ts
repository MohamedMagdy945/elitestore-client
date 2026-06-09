import { Component, inject, signal } from '@angular/core';
import { CatalogService } from '../../../core/services/catalog.service';
import { Category } from '../../../core/models/product/Category.model';
import { TwoStaticComponent } from '../two-static/two-static.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-category-home',
  imports: [TwoStaticComponent],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponents {
  private readonly categoriesService = inject(CatalogService);
  readonly baseUrl = environment.apiUrl ;
  categoriesList = signal<Category[]>([])
  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
      
        this.categoriesList.set(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
