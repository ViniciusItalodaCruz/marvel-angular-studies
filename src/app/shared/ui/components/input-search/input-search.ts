import { Router } from '@angular/router';
import { LucideSearch } from '@lucide/angular';
import { Component, inject } from '@angular/core';

import { Button } from '@components/button/button';

@Component({
  imports: [Button, LucideSearch],
  selector: 'app-input-search',
  templateUrl: './input-search.html',
})
export class InputSearch {
  private readonly router = inject(Router);

  protected async onSearchMovies(event: Event, value: string): Promise<void> {
    event.preventDefault();

    const query = value.trim();

    if (!query) return;

    await this.router.navigate(['/busca'], {
      queryParams: {
        query,
        page: 1,
      },
    });
  }
}
