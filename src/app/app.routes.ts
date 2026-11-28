import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/lp.page';
import { MovieDetails } from './pages/movie-details/movie-details.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPage },
  { path: 'filmes/:id/detalhes', pathMatch: 'full', component: MovieDetails },
];
