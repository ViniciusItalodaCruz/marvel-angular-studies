import { Component, signal } from '@angular/core';
import { InputSearch } from './shared/components/input-search/input-search';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [InputSearch, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('marvel-angular-studies');
}
