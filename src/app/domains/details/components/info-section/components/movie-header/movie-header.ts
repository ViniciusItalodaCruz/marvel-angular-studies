import { Component, input } from '@angular/core';
import { LucideHeart } from '@lucide/angular';
import { Button } from '@/shared/ui/components/button/button';

@Component({
  imports: [LucideHeart, Button],
  selector: 'app-movie-header',
  templateUrl: './movie-header.html',
})
export class MovieHeader {
  readonly title = input.required<string>();
  readonly originalTitle = input.required<string>();
}
