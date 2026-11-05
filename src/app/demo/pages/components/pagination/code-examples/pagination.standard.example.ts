import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-pagination-standard-example',
  standalone: true,
  imports: [HviPagination],
  template: `
    <hvi-pagination [totalItems]="100" [pageSize]="10" [(currentPage)]="currentPage1" />
    <p>Nåværende side: {{ currentPage1() }}</p>
  `,
})
export class PaginationStandardExampleComponent {
  currentPage1 = signal(1);
}
