import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/lp.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPage,
  },
  {
    path: 'filmes/:id/detalhes',
    loadComponent: () =>
      import('./pages/movie-details/movie-details.page').then((m) => m.MovieDetailsPage),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
];
