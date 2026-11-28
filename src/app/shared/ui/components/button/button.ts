import { booleanAttribute, Component, computed, input } from '@angular/core';

import { cn } from '@shared/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'text-white bg-red-600 hover:bg-red-700',
  secondary: 'text-white bg-zinc-900 hover:bg-zinc-800',
  outline: 'bg-transparent text-white border hover:border-white/50 hover:text-white/50',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

@Component({
  selector: 'button[appButton]',
  templateUrl: './button.html',
  host: {
    '[class]': 'hostClasses()',
    '[disabled]': 'disabled()',
  },
})
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false, { transform: booleanAttribute });
  class = input<string>('');

  protected hostClasses = computed(() => {
    return cn(BASE_CLASSES, VARIANT_CLASSES[this.variant()], SIZE_CLASSES[this.size()], this.class);
  });
}
