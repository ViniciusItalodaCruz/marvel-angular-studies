import { Component, computed, input, output } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

import { Button } from '@components/button/button';

@Component({
  imports: [Button, LucideChevronLeft, LucideChevronRight],
  selector: 'app-pagination',
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly page = input.required<number>();
  readonly totalPages = input.required<number>();

  readonly pageChange = output<number>();

  readonly hasPreviousPage = computed(() => this.page() > 1);

  readonly hasNextPage = computed(() => this.page() < this.totalPages());

  previous(): void {
    if (!this.hasPreviousPage()) return;

    this.pageChange.emit(this.page() - 1);
  }

  next(): void {
    if (!this.hasNextPage()) return;

    this.pageChange.emit(this.page() + 1);
  }
}
