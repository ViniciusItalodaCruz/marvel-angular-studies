import { Routes } from '@angular/router';
import { HeroSearchPage } from './domains/heroes/pages/hero-search/hero-search.page';
import { HomeSearchPage } from './domains/home/pages/home-search/home-search.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeSearchPage },
  { path: 'hero/:searchTerm', component: HeroSearchPage },
];
