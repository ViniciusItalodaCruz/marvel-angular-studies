import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from '@shared/ui/components';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Cineclube.');
}
