import { Component, signal } from '@angular/core';
import { Button, ButtonSize, ButtonVariant } from './shared/components/button/button';

@Component({
  imports: [Button],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('marvel-angular-studies');
  protected readonly variant = signal<ButtonVariant>('primary');
  protected readonly size = signal<ButtonSize>('md');
  protected readonly disabled = signal(false);

  protected readonly variants: ButtonVariant[] = ['primary', 'secondary', 'outline'];
  protected readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];

  protected setVariant(variant: ButtonVariant): void {
    this.variant.set(variant);
  }

  protected setSize(size: ButtonSize): void {
    this.size.set(size);
  }

  protected toggleDisabled(): void {
    this.disabled.update((value) => !value);
  }
}
