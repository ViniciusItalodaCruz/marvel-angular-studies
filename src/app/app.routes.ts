import { Routes } from '@angular/router';
import { HomeSearchPage } from './domains/home/pages/home-search/home-search.page';

export const routes: Routes = [{ path: '', pathMatch: 'full', component: HomeSearchPage }];
