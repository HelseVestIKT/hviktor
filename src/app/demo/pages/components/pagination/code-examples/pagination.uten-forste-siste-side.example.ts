import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-pagination-uten-forste-siste-side-example',
  standalone: true,
  imports: [HviPagination],
  template: `
    <hvi-pagination
      [totalItems]="200"
      [pageSize]="10"
      [showEdges]="false"
      [siblingCount]="2"
      [(currentPage)]="currentPage4"
    />
  `,
})
export class PaginationUtenForsteSisteSideExampleComponent {
  currentPage4 = signal(10);
}
