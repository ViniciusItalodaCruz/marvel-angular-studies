import { Routes } from '@angular/router';
import { LandingPage } from './domains/home/pages/landing-page/lp.page';

export const routes: Routes = [{ path: '', pathMatch: 'full', component: LandingPage }];
