import { Component, signal } from '@angular/core';
import { HviPagination } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-pagination-mange-sider-example',
  standalone: true,
  imports: [HviPagination],
  template: `
    <hvi-pagination [totalItems]="500" [pageSize]="10" [(currentPage)]="currentPage2" />
    <p>Side {{ currentPage2() }} av 50</p>
  `,
})
export class PaginationMangeSiderExampleComponent {
  currentPage2 = signal(5);
}
