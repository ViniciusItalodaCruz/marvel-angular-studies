import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

@Component({
  standalone: true,
  imports: [Button],
  template: `<button appButton [variant]="'primary'">Salvar</button>`,
})
class TestHost {}

describe('Button', () => {
  it('should render the button with the primary variant', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const button = host.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.classList.contains('text-white')).toBe(true);
    expect(button?.classList.contains('bg-red-600')).toBe(true);
  });
});
