// Auto-generated - do not edit manually
export const PaginationFaElementerExampleSource = `import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-pagination-fa-elementer-example',
  standalone: true,
  imports: [HviPagination],
  template: \` <hvi-pagination [totalItems]="25" [pageSize]="10" [(currentPage)]="currentPage5" /> \`,
})
export class PaginationFaElementerExampleComponent {
  currentPage5 = signal(1);
}
`;
