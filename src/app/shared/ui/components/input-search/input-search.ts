import { Component, inject } from '@angular/core';
import { Button } from '../button/button';
import { LucideSearch } from '@lucide/angular';
import { Router } from '@angular/router';

@Component({
  imports: [Button, LucideSearch],
  selector: 'app-input-search',
  templateUrl: './input-search.html',
})
export class InputSearch {
  private readonly router = inject(Router);

  protected async onSearchHeroes(event: Event, value: string): Promise<void> {
    event.preventDefault();
    const valueForSearch = value.trim();
    const hasValueForSearch = valueForSearch.length > 0;

    if (!hasValueForSearch) return;

    await this.router.navigate(['/hero', valueForSearch]);
  }
}
