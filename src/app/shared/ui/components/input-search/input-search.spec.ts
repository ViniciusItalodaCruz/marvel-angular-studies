import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputSearch } from './input-search';

describe('InputSearch', () => {
  let fixture: ComponentFixture<InputSearch>;
  let navigate: ReturnType<typeof createNavigateMock>;

  function createNavigateMock() {
    return vi.fn().mockResolvedValue(true);
  }

  beforeEach(async () => {
    navigate = createNavigateMock();

    await TestBed.configureTestingModule({
      imports: [InputSearch],
      providers: [{ provide: Router, useValue: { navigate } }],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSearch);
    fixture.detectChanges();
  });

  function submitSearch(value: string): Event {
    const host: HTMLElement = fixture.nativeElement;
    const input = host.querySelector('input')!;
    const form = host.querySelector('form')!;

    input.value = value;

    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    return event;
  }

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should navigate to the heroes page with the trimmed search term', () => {
    const event = submitSearch('  Spider-Man  ');

    expect(event.defaultPrevented).toBe(true);
    expect(navigate).toHaveBeenCalledExactlyOnceWith(['/heroes', 'Spider-Man']);
  });

  it('should not navigate when the search term is blank', () => {
    submitSearch('   ');

    expect(navigate).not.toHaveBeenCalled();
  });
});
