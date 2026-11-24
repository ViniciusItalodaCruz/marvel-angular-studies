import { Link } from '@/shared/ui/components/link/link';
import { afterNextRender, Component, computed, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface HeroSlide {
  id: number;
  title: string;
  overview: string;
  backdropUrl: string;
}

@Component({
  selector: 'app-hero-slider',
  imports: [RouterLink, Link],
  templateUrl: './hero-slider.html',
})
export class HeroSlider {
  readonly slides = input.required<readonly HeroSlide[]>();
  readonly intervalMs = input(6_000);

  private readonly index = signal(0);
  private readonly browserReady = signal(false);

  readonly activeIndex = computed(() => this.index() % Math.max(this.slides().length, 1));

  readonly activeSlide = computed(() => this.slides()[this.activeIndex()]);

  constructor() {
    afterNextRender(() => {
      this.browserReady.set(true);
    });

    effect((onCleanup) => {
      if (!this.browserReady()) return;

      const total = this.slides().length;
      const delay = this.intervalMs();

      if (total < 2 || delay <= 0) return;

      const nextIndex = (this.activeIndex() + 1) % total;
      const timer = setTimeout(() => this.index.set(nextIndex), delay);

      onCleanup(() => clearTimeout(timer));
    });
  }

  selectSlide(index: number): void {
    this.index.set(index);
  }
}
