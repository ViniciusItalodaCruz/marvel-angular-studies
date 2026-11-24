import { cn } from '@/shared/utils/cn';
import { booleanAttribute, Component, computed, input } from '@angular/core';

export type LinkVariant = 'primary' | 'secondary' | 'outline' | 'underline';
export type LinkSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<LinkSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
};

const VARIANT_CLASSES: Record<LinkVariant, string> = {
  primary: 'text-white bg-red-600 hover:bg-red-700',
  secondary: 'text-white bg-zinc-900 hover:bg-zinc-800',
  outline: 'bg-transparent text-white border hover:border-white/50 hover:text-white/50',
  underline: 'underline',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

@Component({
  imports: [],
  selector: 'app-link',
  templateUrl: './link.html',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Link {
  variant = input<LinkVariant>('primary');
  size = input<LinkSize>('md');
  disabled = input(false, { transform: booleanAttribute });
  class = input<string>('');

  protected hostClasses = computed(() => {
    return cn(BASE_CLASSES, VARIANT_CLASSES[this.variant()], SIZE_CLASSES[this.size()], this.class);
  });
}
