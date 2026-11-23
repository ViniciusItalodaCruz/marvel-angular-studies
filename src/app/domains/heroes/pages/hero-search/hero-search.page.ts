import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideHouse } from '@lucide/angular';
import { Button } from '../../../../shared/components/button/button';

@Component({
  imports: [Button, LucideHouse],
  selector: 'app-hero-search',
  templateUrl: './hero-search.page.html',
})
export class HeroSearchPage {
  private readonly router = inject(Router);
  protected readonly searchTerm = inject(ActivatedRoute).snapshot.params['searchTerm'] ?? '';
  protected readonly hasSearchTerm = this.searchTerm.length > 0;

  protected async navigateToHome(): Promise<void> {
    await this.router.navigate(['/']);
  }
}
